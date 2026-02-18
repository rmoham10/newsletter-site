const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');

//const server = http.createServer(routes.handler);
const server = http.createServer((req, res) => {    //call back function req keeps open the psge for listening from the user for requets to respond(event loop concept)
    //console.log(req.url, req.method, req.headers);  //request object: with the req.header, req url, req.method gets the output about the req url, method and the headers present. can ask more as we need to know the details as wanted
    //process.exit();                                 //hardcoded to quit the process(wont be using as we dont wanna quit our page)
    
//});

    const url = req.url.split('?')[0];
    const method = req.method;

    // Serve CSS
    if (url === '/buttonStyle.css') {
        const filePath = path.join(__dirname, 'buttonStyle.css');
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