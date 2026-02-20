const fs = require('fs');

const VALID_CATEGORIES = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const requestHandler = (req, res) => {
    const url = req.url.split('?')[0];
    const method = req.method;

    // Serve About Page
    if (url === '/about' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head>');
        res.write('<title>About</title>');
        res.write(`<style>
            html, body { height: 100%; margin:0; font-family: Arial, sans-serif; }
            body { background: #f0f0f0; }
            button { padding:5px 10px; cursor:pointer; }
        </style>`);
        res.write('</head><body>');
        res.write('<button onclick="history.back()">Back</button>');
        res.write('<h1>About This News Blog</h1>');
        res.write('<p>Latest news from multiple categories fetched via NewsAPI.</p>');
        res.write('</body></html>');
        return res.end();
    }

    // Serve Home Page
    if (url === '/' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head><title>News Headlines</title></head><body>');
        res.write('<h1>Latest Headlines</h1>');
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
                        if (!data.articles || data.articles.length === 0) {
                            container.innerHTML = '<p>No headlines found for this category.</p>';
                            return;
                        }
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

                // Load default
                fetchHeadlines('business');

                // Change category
                select.addEventListener('change', () => {
                    fetchHeadlines(select.value);
                });
            </script>
        `);
        res.write('</body></html>');
        return res.end();
    }

    // API: Get Headlines
    if (url.startsWith('/get-headlines') && method === 'GET') {
        const query = new URL(url, `http://${req.headers.host}`).searchParams;
        let category = query.get('category') || 'business';

        // Validate category
        if (!VALID_CATEGORIES.includes(category)) category = 'business';

        const apiKey = process.env.NEWS_API_KEY;
        const country = 'us'; // ensures unique headlines per category
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=${apiKey}`;

        fetch(newsUrl)
            .then(response => response.json())
            .then(data => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(data));
            })
            .catch(err => {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: err.message}));
            });
        return;
    }

    // Default
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Page Not Found</h1>');
};

module.exports.handler = requestHandler;