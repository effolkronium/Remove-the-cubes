const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`LOG: request url === ${req.url}`);

    const {url} = req;

    // app icon
    if(/favicon/i.test(url)) sendFile('./favicon.png', 'image/png', res);

    
    console.log(`LOG: request is ended`);
});

server.listen(8080);

// Send file to a client and auto-end responce
function sendFile(path, contentType, responce) {
    responce.setHeader('Content-Type', contentType);
    fs.createReadStream(path).pipe(responce);
}