const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2] || path.join(__dirname, 'large-file.txt');
const destinationPath = process.argv[3] || path.join(__dirname, 'copied-large-file.txt');

function createSampleLargeFile(filePath) {
  const chunk = 'This is a sample large file created for stream testing.\n';
  const repeatedSize = 200000; // ~ 3.2 MB
  let content = '';

  for (let i = 0; i < repeatedSize; i++) {
    content += chunk;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Sample source file created: ${filePath}`);
}

if (!fs.existsSync(sourcePath)) {
  createSampleLargeFile(sourcePath);
}

const readStream = fs.createReadStream(sourcePath, {
  highWaterMark: 64 * 1024,
});

const writeStream = fs.createWriteStream(destinationPath, {
  flags: 'w',
});

let totalBytesCopied = 0;

readStream.on('data', (chunk) => {
  totalBytesCopied += chunk.length;
});

readStream.on('error', (error) => {
  console.error(`Error reading source file: ${error.message}`);
  writeStream.destroy();
});

writeStream.on('error', (error) => {
  console.error(`Error writing destination file: ${error.message}`);
});

writeStream.on('finish', () => {
  console.log(`File copied successfully from ${sourcePath} to ${destinationPath}`);
  console.log(`Total bytes copied: ${totalBytesCopied}`);
});

readStream.pipe(writeStream);
