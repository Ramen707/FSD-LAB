const http = require('http');

const host = 'localhost';
const port = 3000;

const options = {
  hostname: host,
  port: port,
  path: '/hello',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Body:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.end();
