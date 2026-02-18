const fs = require('fs');
const fetch = require('node-fetch');    
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
        res.write('<a href="/headlines"><button>Headlines</button></a>');
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
        res.write('<a href="/headlines"><button>Headlines</button></a>');
        res.write('<a href="/info"><button>Sports</button></a>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); 
    }

    if (url === '/headlines' && method === 'GET') {
        const apiKey = process.env.NEWS_API_KEY; // keep your key in env vars
        const newsUrl = `https://newsapi.org/v2/top-headlines?language=en&pageSize=5&apiKey=${apiKey}`;

        fetch(newsUrl)
            .then(response => response.json())
            .then(data => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write('<html>');
                res.write('<head><title>Headlines</title></head>');
                res.write('<body>');
                res.write('<h1>Latest Headlines</h1>');
                res.write('<ul>');

                data.articles.forEach(article => {
                    res.write(`<li><a href="${article.url}" target="_blank">${article.title}</a></li>`);
                });

                res.write('</ul>');
                res.write('<button onclick="window.history.back()">Back</button>');

                // Top-right menu
                res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
                res.write('<a href="/info"><button>About</button></a>');
                res.write('<a href="/info"><button>Region</button></a>');
                res.write('<a href="/headlines"><button>Headlines</button></a>');
                res.write('<a href="/info"><button>Sports</button></a>');
                res.write('</div>');

                res.write('</body></html>');
                res.end();
            })
            .catch(err => {
                res.statusCode = 500;
                res.end('Error fetching news: ' + err.message);
            });
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
        res.write('<a href="/headlines"><button>Headlines</button></a>');
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
