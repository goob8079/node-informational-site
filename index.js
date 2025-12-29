import http from 'http';
import fs from 'fs';

const PORT  = 8080;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let path = './pages/';
    switch(req.url) {
        case '':
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/contact-me':
            path += 'contact-me.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // not clarifying datatype makes data a Buffer (raw binary)
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Interal Server Error!');
        } else {
            // Node sends HTML directly to browser
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`);
});