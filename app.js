const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.handler);
//const server = http.createServer((req, res) => {    //call back function req keeps open the psge for listening from the user for requets to respond(event loop concept)
    //console.log(req.url, req.method, req.headers);  //request object: with the req.header, req url, req.method gets the output about the req url, method and the headers present. can ask more as we need to know the details as wanted
    //process.exit();                                 //hardcoded to quit the process(wont be using as we dont wanna quit our page)
    
//});

server.listen(3000);    //for opening the page on port number 3000