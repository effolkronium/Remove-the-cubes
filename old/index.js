const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime'); // https://www.npmjs.com/package/mime
const gameResult = require('./result')

const port = process.argv[2] || 8080;

const server = http.createServer((request, response) => {
    console.log(`LOG: ${request.method} ${request.url}`);

    if ('GET' === request.method) {
        if (/ajax/.test(request.url)) {
            processGetRequestAjax(request, response);
        } else {
            processGetRequest(request, response);
        }
    } else if ('POST' === request.method) {
        let postData = '';
        request.on('data', data => {
            postData = postData + data;
        });

        request.on('end', () => {
            processPostRequest(request, response, postData);
        });
    } else {
        response.statusCode = 501; // Not Implemented
        response.end('Not Implemented')
    }
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);

function processGetRequest(request, response) {
    const parsedUrl = url.parse(request.url); // Ignore '?...' or '#...' in url by pathname
    let pathname = `./public${parsedUrl.pathname}`;

    fs.exists(pathname, exist => {
        if (!exist) {
            response.statusCode = 404;
            response.end(`Path ${pathname} isn't exist.`);
        } else {
            // root
            if ('./public/' === pathname) {
                pathname += '/index.html';
            }

            const readStream = fs.createReadStream(pathname);

            readStream.on('error', err => {
                response.statusCode = 500;
                response.end(`Error getting the file: ${err}.`);
            });

            const fileExt = path.parse(pathname).ext;
            response.setHeader('Content-type', mime.getType(fileExt));

            readStream.pipe(response);
        }
    })
}

function processGetRequestAjax(request, response) {
    if(request.url !== '/ajax/get_top_10') {
        response.statusCode = 400; // Bad Request
        response.end();
        return;
    }

    response.setHeader('Content-type', mime.getType('json'));

    response.end(JSON.stringify(gameResult.getTop10()));
}

function processPostRequest(request, response, data) {
    try {
        if ('/save_result' !== url.parse(request.url).pathname)
            throw new Error('Invalid API');
        
        const result = JSON.parse(data);

        if (undefined === result.name || undefined === result.points)
            throw new Error('Invalid result data');

        gameResult.add(result, err => {
            if(err) {
                response.statusCode = 500; // Internal Server Error
            } else {
                response.statusCode = 201;
            }

            response.end();
        });
    } catch (e) {
        console.log(e);
        response.statusCode = 400; // Bad Request
        response.end();
    }
}
