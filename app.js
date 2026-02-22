const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');

//const server = http.createServer(routes.handler);
const server = http.createServer((req, res) => {    //call back function req keeps open the psge for listening from the user for requets to respond(event loop concept)
    
    const url = req.url.split('?')[0];
    const method = req.method;

    // Serve CSS
    if (url === '/style.css') {
        const filePath = path.join(__dirname, 'style.css');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading CSS');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
        return;
    }

    if(url === '/background.jpg') {
        const filePath = path.join(__dirname, 'background.jpg'); // image in main folder
        fs.readFile(filePath, (err, data) => {
            if(err){
                res.writeHead(404);
                return res.end('Image not found');
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        });
        return;
    }

    // Otherwise, handle normal routes
    routes.handler(req, res);
});
const PORT = process.env.PORT || 3000;
server.listen(PORT);

//server.listen(3000);    //for opening the page on port number 3000