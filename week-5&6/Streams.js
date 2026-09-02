const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt');

const readableStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
const writableStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

readableStream.on('data', (chunk) => {
  console.log(`Read ${chunk.length} bytes from input file.`);
});

readableStream.on('error', (err) => {
  console.error('Error reading the input file:', err.message);
});

writableStream.on('finish', () => {
  console.log(`Data successfully written to ${outputFile}`);
});

writableStream.on('error', (err) => {
  console.error('Error writing the output file:', err.message);
});

readableStream.pipe(writableStream);

console.log(`Reading from: ${inputFile}`);
console.log(`Writing to: ${outputFile}`);
