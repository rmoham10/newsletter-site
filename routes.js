const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url.split('?')[0];
    const method = req.method;
    if(url === '/xx'){
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head><title>Homepage</title>');
        res.write('<link rel="stylesheet" href="/buttonStyle.css">');
        res.write('</head>');
        res.write('<body>');
        res.write(`
                    <style>
                        html, body { height: 100%; margin: 0; }
                        body {
                            background-image: url('background.jpg'); /* path to your image */
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-attachment: fixed;
                            font-family: Arial, sans-serif;
                        }
                        button {
                            padding: 5px 10px;
                            cursor: pointer;
                        }
                        a { text-decoration: none; }
                    </style>
                `);        
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/about"><button>About</button></a>');
        res.write('<a href="/"><button>Home</button></a>');
        res.write('</div>');
        res.write('</body');     
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/about' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head>');
        res.write('<link rel="stylesheet" href="/style.css">');
        res.write(`
                    <style>
                        html, body { height: 100%; margin: 0; }
                        body {
                            background-image: url('background.jpg'); /* path to your image */
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-attachment: fixed;
                            font-family: Arial, sans-serif;
                        }
                        button {
                            padding: 5px 10px;
                            cursor: pointer;
                        }
                        a { text-decoration: none; }
                    </style>
                `);
        res.write('<title>About the page</title></head>');
        res.write('<body><button onClick = "goBack()">back</button>');
        res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<h1>About This News Blog</h1>');
        res.write('<p>Welcome to my News Blog!<br>This site is built to provide the latest headlines from around the world.</p>');
        res.write('<p>You can explore news from multiple categories such as Business, Sports, Technology, Health, Science, and Entertainment.<br>All headlines are fetched dynamically from NewsAPI and updated daily, so you always get fresh content.</p>');
        //res.write('<button onClick = "goBack()">back</button>');
        //res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/about"><button>About</button></a>');
        res.write('<a href="/"><button>Home</button></a>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); 
    }

    /*
    if(url === '/headlines' && method === 'GET') {
        const apiKey = process.env.NEWS_API_KEY;
        const categories = ['business','entertainment','health','science','sports','technology'];
        const fetches = categories.map(cat => {
            const url = `https://newsapi.org/v2/top-headlines?language=en&category=${cat}&pageSize=5&apiKey=${apiKey}`;
            return fetch(url).then(res => res.json()).then(data => ({category: cat, articles: data.articles}));
        });

        Promise.all(fetches)
            .then(results => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<html>');
                res.write('<head>');
                res.write(`
                            <style>
                                html, body { height: 100%; margin: 0; }
                                body {
                                    background-image: url('background.jpg'); 
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-attachment: fixed;
                                    font-family: Arial, sans-serif;
                                }
                                button {
                                    padding: 5px 10px;
                                    cursor: pointer;
                                }
                                a { text-decoration: none; }
                            </style>
                        `);
                res.write('<title>Headlines by Category</title></head>');
                res.write('<body>');
                res.write('<button onClick = "goBack()">back</button>');
                res.write('<script> function goBack(){ window.history.back()}</script>');
                res.write('<h1>Latest Headlines by Category</h1>');

                results.forEach(result => {
                    res.write(`<h2>${result.category.toUpperCase()}</h2>`);
                    res.write('<ul>');
                    result.articles.forEach(article => {
                        res.write(`<li style="margin-bottom:20px;">
                            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image" style="width:300px;">` : ''}
                            <p>${article.description || ''}</p>
                            <small>${new Date(article.publishedAt).toLocaleString()}</small>
                        </li>`);
                    });
                    res.write('</ul>');
                });

                res.write('<button onclick="window.history.back()">Back</button>');

                // top-right menu
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
                res.writeHead(500);
                res.end('Error fetching news: ' + err.message);
            });

        return;
    }
    */

    if (url === '/' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html>');
        res.write('<head><title>Headlines</title>');
        res.write('<link rel="stylesheet" href="/buttonStyle.css">');
        res.write('</head>');
        res.write('<body>');
        res.write(`
                            <style>
                                html, body { height: 100%; margin: 0; }
                                body {
                                    background-image: url('background.jpg'); 
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    background-position: center;
                                    background-attachment: fixed;
                                    font-family: Arial, sans-serif;
                                }
                                button {
                                    padding: 5px 10px;
                                    cursor: pointer;
                                }
                                a { text-decoration: none; }
                            </style>
                        `);
        res.write('<h1>Latest Headlines</h1>');

        // Dropdown for category selection
        res.write(`
            <label for="categorySelect">Select Category:</label>
            <select id="categorySelect">
                <option value="business" selected>Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <div id="headlinesContainer" style="margin-top:20px;"></div>

            <script>
                const container = document.getElementById('headlinesContainer');
                const select = document.getElementById('categorySelect');

                async function fetchHeadlines(category) {
                    container.innerHTML = '<p>Loading...</p>';
                    try {
                        const res = await fetch('/get-headlines?category=' + category);
                        const data = await res.json();
                        let html = '<ul>';
                        data.articles.forEach(article => {
                            html += \`<li style="margin-bottom:20px;">
                                <h3><a href="\${article.url}" target="_blank">\${article.title}</a></h3>
                                \${article.urlToImage ? '<img src="' + article.urlToImage + '" style="width:300px;">' : ''}
                                <p>\${article.description || ''}</p>
                                <small>\${new Date(article.publishedAt).toLocaleString()}</small>
                            </li>\`;
                        });
                        html += '</ul>';
                        container.innerHTML = html;
                    } catch(err) {
                        container.innerHTML = '<p>Error fetching headlines</p>';
                    }
                }

                // Load default Business headlines
                fetchHeadlines('business');

                // Fetch headlines when category changes
                select.addEventListener('change', () => {
                    fetchHeadlines(select.value);
                });
            </script>
        `);

        // Top-right menu
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/about"><button>About</button></a>');
        res.write('<a href="/"><button>Home</button></a>');
        res.write('</div>');

        res.write('</body></html>');
        res.end();
        return;
    }

    if (url.startsWith('/get-headlines') && method === 'GET') {
        const query = new URL(url, `http://${req.headers.host}`).searchParams;
        const category = query.get('category') || 'business';

        const apiKey = process.env.NEWS_API_KEY;
        const newsUrl = `https://newsapi.org/v2/top-headlines?language=en&category=${category}&pageSize=10&apiKey=${apiKey}`;

        fetch(newsUrl)
            .then(response => response.json())
            .then(data => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(data));
            })
            .catch(err => {
                res.writeHead(500);
                res.end(JSON.stringify({error: err.message}));
            });

        return;
    }


    if(url === '/user' && method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');                        //res.write to send response/show in our page when the page is visited
        res.write('<head>');
        res.write('<link rel="stylesheet" href="/buttonStyle.css">');
        res.write('</head>');
        res.write(`
                    <style>
                        html, body { height: 100%; margin: 0; }
                        body {
                            background-image: url('background.jpg'); /* path to your image */
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-attachment: fixed;
                            font-family: Arial, sans-serif;
                        }
                        button {
                            padding: 5px 10px;
                            cursor: pointer;
                        }
                        a { text-decoration: none; }
                    </style>
                `);        
        res.write('<title>User</title></head>');
        res.write('<body><button onClick = "goBack()">back</button>');
        res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<h1>User Page</h1>');
        res.write('<p>Name: RiyazMohammad<br>Age: 29<br>DOB: 08-01-1996</p>');
        //res.write('<button onClick = "goBack()">back</button>');
        //res.write('<script> function goBack(){ window.history.back()}</script>');
        res.write('<div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">');
        res.write('<a href="/about"><button>About</button></a>');
        res.write('<a href="/"><button>Home</button></a>');
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
