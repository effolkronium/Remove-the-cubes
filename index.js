const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(`LOG: request url === ${request.url}`);

    const url = request.url;

    const sender = new Sender(response); // Implemented below

    // root
    if ('/' === url)
        sender.sendHtml(`./public/index.html`);

    // app icon
    else if (/favicon/i.test(url))
        sender.sendPng('./favicon.png');

    // html
    else if (/.html$/.test(url))
        sender.sendHtml(`./public${url}`);

    // css
    else if (/.css/.test(url))
        sender.sendCSS(`./public${url}`)

    // js
    else if (/.js$/.test(url))
        sender.sendJS(`./public${url}`);

    // png
    else if (/.png$/.test(url))
        sender.sendPng(`./public${url}`)

    // svg
    else if (/.svg$/.test(url))
        sender.sendSVG(`./public${url}`)

    // api
    else if (/api/.test(url)) {

        if (/load_result_table/.test(url))
            fs.readFile('./result.json', 'utf8', (err, data)=>{
                if(err) {
                    console.warn(`Read result.json error: ${err}`)
                } else {
                    sender.sendJSON(data);
                }
            });
        else if (/save_result_table/.test(url)) {
            let reqData = '';

            request.on('data', data => {
                reqData += data;
            });

            request.on('end', () => {
                fs.writeFile('./result.json', reqData);
            });
        }

    }
    // error
    else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found");
        response.end();
    }

    console.log(`LOG: request is ended`);
});

server.listen(8080);

// Send different files to a client
class Sender {
    constructor(response) {
        this.response = response;
    }

    // Send file to a client and auto-end response
    sendFile(path, contentType) {
        this.response.setHeader('Content-Type', contentType);

        const reader = fs.createReadStream(path);

        reader.pipe(this.response);

        reader.on('error', errArg => {
            this.response.writeHead(404, { "Content-Type": "text/plain" });
            this.response.write(`ReadStream error: ${errArg} 404 Not Found`);
            this.response.end();
        });
    }

    sendPng(path) { this.sendFile(path, 'image/png'); }
    sendHtml(path) { this.sendFile(path, 'text/html') }
    sendCSS(path) { this.sendFile(path, 'text/css') }
    sendJS(path) { this.sendFile(path, 'application/javascript') }
    sendSVG(path) { this.sendFile(path, 'image/svg+xml') }

    sendJSON(jsonObject) {
        if (typeof (jsonObject) === 'object')
            jsonObject = JSON.stringify(jsonObject);

        this.response.writeHead(200, { "Content-Type": "application/json" });
        this.response.write(jsonObject);
        this.response.end();
    }
}