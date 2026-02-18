const http = require('http');

const server = http.createServer((req, res) =>{
    const url = req.url
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Homepage</title></head>');
        res.write('<body><form action = "/user" method = "GET"><button type = "submit">User</button></form></body>');
        res.write('</html>');
        return res.end();
    };

    if(url === '/user' && method === 'GET'){
        res.write('<html>');
        res.write('<head><title>Homepage</title></head>');
        res.write('<a href="/region" ><button>Region</button></a>');
        res.write('</html>');
        return res.end();
    };

    if(url === '/region' && method === 'GET'){
        res.write('<html>');
        res.write('<head><title>Homepage</title></head>');
        res.write('<body><form action = "/Canada" method = "GET"><button type = "submit">Canada</button></form></body>');
        res.write('</html>');
        return res.end();
    };
});
server.listen(3000);