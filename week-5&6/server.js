const http = require('http');

const DEFAULT_PORT = 3000;

function startServer(port) {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/hello') {
      res.end('Hello from Node.js HTTP server!');
      return;
    }

    if (req.url === '/about') {
      res.end('This is the About page.');
      return;
    }

    res.end('Welcome to the Node.js server. Visit /hello or /about');
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
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer(Number(process.env.PORT) || DEFAULT_PORT);
