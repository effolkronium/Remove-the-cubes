const http = require('http');
const fs = require('fs');

const server = http.createServer((req, response) => {
    console.log(`LOG: request url === ${req.url}`);

    const url = req.url;

    const sender = new Sender(response);

    // root
    if ('/' === url)
        sender.sendHtml(`./public/rules.html`);

    // app icon
    else if (/favicon/i.test(url))
        sender.sendPng('./favicon.png');

    // html
    else if (/.html$/.test(url))
        sender.sendHtml(`./public${url}`);

    // css
    else if(/.css/.test(url))
        sender.sendCSS(`./public${url}`)

    // js
    else if(/.js$/.test(url))
        sender.sendJS(`./public${url}`);

    // png
    else if(/.png$/.test(url))
        sender.sendPng(`./public${url}`)

    // svg
    else if(/.svg$/.test(url))
        sender.sendSVG(`./public${url}`)
    
    // error
    else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
    }
    
    console.log(`LOG: request is ended`);
});

server.listen(8080);

// Send different files to a client
class Sender {
    constructor(responce) {
        this.responce = responce;
    }

    // Send file to a client and auto-end responce
    sendFile(path, contentType) {
        this.responce.setHeader('Content-Type', contentType);

        const reader = fs.createReadStream(path);
        
        reader.pipe(this.responce);

        let responce = this.responce;
        reader.on('error', errArg=>{
            this.responce.writeHead(404, {"Content-Type": "text/plain"});
            this.responce.write(`ReadStream error: ${errArg} 404 Not Found\n`);
            this.responce.end();
        });
    }

    sendPng(path) { this.sendFile(path, 'image/png'); }
    sendHtml(path) { this.sendFile(path, 'text/html') }
    sendCSS(path) { this.sendFile(path, 'text/css') }
    sendJS(path) { this.sendFile(path, 'application/javascript') }
    sendSVG(path) { this.sendFile(path, 'image/svg+xml') }
}