const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
require("dotenv-json")();

dotenv.config();

app.listen(port, ()=> console.log(`listening on port ${port}`));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


async function detectSpider() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: '.env.json'
  });

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/widow.png');
  const labels = result;
  console.log('Labels:');
  console.log(labels);

  //labels.forEach(label => console.log(label.description));
}

detectSpider();
