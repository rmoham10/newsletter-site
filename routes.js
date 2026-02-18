const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url.split('?')[0];
    const method = req.method;
    if(url === '/'){
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('<form action="/info" method="GET"><button type="submit">Info</button></form></body>')
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/message' && method === 'POST'){
        const body = [];  // 
        req.on('data', (chunk) =>{      //on to listen to the coming events like data we entered in the form so that we collect that data and write it in a file or to save
            console.log(chunk);
            body.push(chunk);    //used to collect data as chunks(bytes)
        });
        return req.on('end', () =>{    //fucntion to use the data received to after the whole data is pushed into the body as chunks
            const parsedBody = Buffer.concat(body).toString();  //concat the chunks and makes it readable
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];   //to get the data that user given not consoling the name we given in line 12
            fs.appendFile('message.txt', message, err =>{  //to get the user given data into the file created dynamically (this is written as a function so that this loine to be executed before going to the next line)
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    if(url === '/info' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>This is the first i am creating using node.js function</h1>');
        res.write('<p>Name: RiyazMohammad<br>Age: 29<br>DOB: 08-01-1996</p>');
        res.write('<form action="/info/user" method="GET"><button type="submit">User</button></form></body>')
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/info/user' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>User</title></head>');
        res.write('<body><h1>User Page</h1>');
        res.write('<p>Name: RiyazMohammad<br>Age: 29<br>DOB: 08-01-1996</p>');        res.write('</html>');
        return res.end(); 
    }
    
    res.setHeader('Content-Type', 'text/html'); //'Content-Type' default header key 
    res.write('<html>');                        //res.write to send response/show in our page when the page is visited
    res.write('<head><title>My First Page</title><</head>');
    res.write('<body><h1>Hello Everyone</h1></body>');
    res.write('</html>');
    res.end();
};

/*module.exports = {
    handler:  requestHandler,
    someText: 'hard coded text'
};
*/
module.exports.handler = requestHandler;

//exports.handler = requestHandler;
