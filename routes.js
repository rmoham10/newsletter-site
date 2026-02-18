const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url.split('?')[0];
    const method = req.method;
    if(url === '/'){
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>Homepage</title></head>');
        res.write('<body>');
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/info"><button>About</button></a>');
        res.write('<a href="/info"><button>Region</button></a>');
        res.write('<a href="/info"><button>Headlines</button></a>');
        res.write('<a href="/info"><button>Sports</button></a>');
        res.write('</div>');
        res.write('</body');     
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/info' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>This is the first i am creating using node.js function</h1>');
        res.write('<p>Name: RiyazMohammad<br>Age: 29<br>DOB: 08-01-1996</p>');
        res.write('<a href = "/user"><button>User</button></a>');
        res.write('<button onClick = "goBack()">back</button>');
        res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/info"><button>About</button></a>');
        res.write('<a href="/info"><button>Region</button></a>');
        res.write('<a href="/info"><button>Headlines</button></a>');
        res.write('<a href="/info"><button>Sports</button></a>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); 
    }



    if(url === '/user' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>User</title></head>');
        res.write('<body><h1>User Page</h1>');
        res.write('<p>Name: RiyazMohammad<br>Age: 29<br>DOB: 08-01-1996</p>');
         res.write('<button onClick = "goBack()">back</button>');
        res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/info"><button>About</button></a>');
        res.write('<a href="/info"><button>Region</button></a>');
        res.write('<a href="/info"><button>Headlines</button></a>');
        res.write('<a href="/info"><button>Sports</button></a>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
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
