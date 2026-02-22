const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url.split('?')[0];
    const method = req.method;

// About Page
if (url === '/about' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
    <html>
    <head>
        <title>About</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav>
        <div class="logo">NewsBlog</div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>

    <section id="about">
        <h1 class="title">About This News Blog</h1>
        <p class="about-text">
            This website fetches real-time headlines using the GNews API.
            Users can browse categories like Business, Tech, Sports, and more.
        </p>
        <button class="btn btn-color-2" onclick="history.back()">Go Back</button>
    </section>

    </body>
    </html>
    `);
    return res.end();
}



// Home Page
if (url === '/' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
    <html>
    <head>
        <title>News Headlines</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav>
        <div class="logo">NewsBlog</div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>

    <section id="news">
        <h1 class="title">Latest Headlines</h1>

        <div class="category-box">
            <label>Select Category:</label>
            <select id="categorySelect">
                <option value="general" selected>General</option>
                <option value="world">World</option>
                <option value="nation">Nation</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="science">Science</option>
                <option value="health">Health</option>
            </select>
        </div>

        <div id="headlinesContainer" class="news-container"></div>
    </section>

    <script>
        const container = document.getElementById('headlinesContainer');
        const select = document.getElementById('categorySelect');

        async function fetchHeadlines(category) {
            container.innerHTML = '<p>Loading...</p>';
            try {
                const res = await fetch('/get-headlines?category=' + category);
                const data = await res.json();

                if (!data.articles || data.articles.length === 0) {
                    container.innerHTML = '<p>No news found.</p>';
                    return;
                }

                let html = '';
                data.articles.forEach(article => {
                    html += \`
                    <div class="news-card">
                        <h3><a href="\${article.url}" target="_blank">\${article.title}</a></h3>
                        \${article.image ? '<img src="' + article.image + '">' : ''}
                        <p>\${article.description || ''}</p>
                        <small>\${new Date(article.publishedAt).toLocaleString()}</small>
                    </div>\`;
                });
                container.innerHTML = html;
            } catch (err) {
                container.innerHTML = '<p>Error fetching news</p>';
            }
        }

        fetchHeadlines('general');
        select.addEventListener('change', () => fetchHeadlines(select.value));
    </script>

    </body>
    </html>
    `);
    return res.end();
}


//GNewsAPI
if (url.startsWith('/get-headlines') && method === 'GET') {
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    let category = query.get('category') || 'general';

    const VALID_CATEGORIES = ['general','world','nation','business','technology','entertainment','sports','science','health'];
    if (!VALID_CATEGORIES.includes(category)) category = 'general';

    const apiKey = process.env.GNEWS_API_KEY;


    const newsUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=ca&max=10&apikey=${apiKey}`;

    fetch(newsUrl)
        .then(r => r.json())
        .then(data => {
            console.log(JSON.stringify(data, null, 2));
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        })
        .catch(err => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        });

    return;
}
    //error page
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Page Not Found</h1>');
};

module.exports.handler = requestHandler;