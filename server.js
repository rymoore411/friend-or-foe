const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const findSpider = require('./utils');

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.listen(port, ()=> console.log(`listening on port ${port}`));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

// const {auth} = require('google-auth-library');

// // load the environment variable with our keys
// const keysEnvVar = process.env['CREDS'];
// if (!keysEnvVar) {
//   throw new Error('The $CREDS environment variable was not found!');
// }
// const keys = JSON.parse(keysEnvVar);
// const getClient = auth.fromJSON(keys);

//Google Vision Setup
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  projectId: process.env.PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
});


//Spider stuffs

const spiderBros = ['black widow spider', 'wolf spider', 'brown recluse spider', 'hobo spider', 'southern black widow'];

app.post('/spider', async (req, res, next) => {

  try{
    const [web] = await client.webDetection(req.files.file.data);
    const entities = web.webDetection.webEntities;
    const badSpider = findSpider(entities, spiderBros);
    res.send(badSpider[0]);
  }
  catch(ex){
    next(ex);
  }

})

