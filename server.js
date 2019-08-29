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
const spiderBros = ['black widow spider', 'wolf spider', 'brown recluse spider', 'hobo spider', 'southern black widow', 'armed spider', 'western black widow', 'redback spider', 'sydney funnel-web spider', 'funnel-web spider', 'brazilian wandering spider', 'yellow sac spider', 'brown widow spider', 'red widow spider', 'six-eyed sand spider', 'chilean recluse spider', 'northern funnel web spider', 'funnel web spider', 'sydney funnel web spider', 'red-legged widow spider', 'noble false widow', 'katipo', 'fishing spider', 'phoneutria fera', 'phoneutria'];

app.post('/spider', async (req, res, next) => {

  try{
    const [web] = await client.webDetection(req.files.file.data);
    const entities = web.webDetection.webEntities.filter(el => (el.description !== ''));
    const badSpider = findSpider(entities, spiderBros);
    if(badSpider.length > 0 && badSpider[0].score > .6){
      badSpider[0].danger = true;
      res.send(badSpider[0]);
    }
    else if(entities[0].description.toLowerCase() === 'spider') {
      entities[1].danger = false;
      res.send(entities[1]);
    }
    else {
      entities[0].danger = false;
      res.send(entities[0]);
    }
  }
  catch(ex){
    next(ex);
  }

})
