const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`LOG: request url === ${req.url}`);

    const { url } = req;

    const sender = new Sender(res);

    // app icon
    if (/favicon/i.test(url)) sender.sendPng('./favicon.png');

    res.end();
    console.log(`LOG: request is ended`);
});

server.listen(8080);

class Sender {
    constructor(responce) {
        this.responce = responce;
    }

    // Send file to a client and auto-end responce
    sendFile(path, contentType) {
        this.responce.setHeader('Content-Type', contentType);
        fs.createReadStream(path).pipe(this.responce);
    }

    sendPng(path) {
        this.sendFile(path, 'image/png');
    }
}