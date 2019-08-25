const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
require("dotenv-json")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.listen(port, ()=> console.log(`listening on port ${port}`));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

//Google Vision Setup
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: '.env.json'
});



app.post('/spider', async (req, res, next) => {

    console.log(req.body[0].path);
    // Performs label detection on the image file
    const [result] = await client.labelDetection(req.body[0].path);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));


})

