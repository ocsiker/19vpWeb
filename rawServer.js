const http = require('http');
const fs   = require('fs');

const homePage = fs.readFileSync('homePage.html');
const server   = http.createServer((req, res) => {
    if (req.url === '/')
        res.end('Hello node.js');
    else if (req.url === '/about')
        res.end('about page');
    else if (req.url === '/homepage')
        res.end(homePage);
    else
    {
        res.writeHead(404);
        res.end('page not pound');
    }
});

server.listen(3000);
