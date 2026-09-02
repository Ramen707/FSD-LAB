const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const DEFAULT_PORT = 4000;

function startServer(port) {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://localhost:${port}`);
    const query = Object.fromEntries(parsedUrl.searchParams.entries());

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
      const filePath = path.join(__dirname, 'form.html');

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading form page');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      });
      return;
    }

    if (req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const formData = new URLSearchParams(body);
        const form = Object.fromEntries(formData.entries());

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          queryString: query,
          formData: form,
        }, null, 2));
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      queryString: query,
      formData: {}
    }, null, 2));
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.log(`Port ${port} is busy. Trying ${nextPort} instead...`);
      startServer(nextPort);
      return;
    }

    console.error('Server error:', error);
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer(Number(process.env.PORT) || DEFAULT_PORT);
