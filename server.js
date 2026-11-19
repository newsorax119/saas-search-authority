const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  let filePath = req.url === '/' ? 'index.html' : req.url.split('?')[0].slice(1);
  filePath = path.join(__dirname, filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'text/html' });
    res.end(data);
  });
}).listen(port, () => console.log('Listening on ' + port));
