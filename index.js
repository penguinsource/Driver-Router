const dotenv = require('dotenv');
dotenv.config({ path: `./config/dev.env` });

const express = require('express')
const app = express()

const SendSMS = require('./resources/SMS')
const Geocode = require('./resources/Geocode')

const port = 3000

app.use(express.static('./react/build'))

const fetch = require('node-fetch')



// SendSMS('+19545361700', 'Whats up jack1')

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=YOUR_API_KEY

// const run = async () => {
//   const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+GOOGLE_API_KEY)
//   const resp = await response.json()
//   console.log('resp is', resp)

//   console.log('...', resp.results[0].geometry)
// }

const addresses = [
  '1000 S Ocean Blvd,Boca Raton FL, 33432',
  '10217 Sleepy Way Brk  Boca Raton  FL  33428',
  '4851 Sugar Pine Dr  Boca Raton  FL  33487',
  '1050 NW 15th Ave  Boca Raton  FL  33486',
  '4157 Cedar Creek Rd   Boca Raton  FL  33487'
]

const run = async () => {
  const hello = await Geocode.getLatLon('854 Broken Sound Pkwy NW, Boca Raton, FL 33487')
  return
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]
    const hello = await Geocode.getLatLon(address)
    console.log('hello', i, 'is', hello)
  }
}

run()


// Endpoints below:

app.get('/api/sup', (req, res) => {
  const text = 'Hello World 2! here is sample api:' + process.env.SAMPLE_API_KEY + ', all others are:' + JSON.stringify(process.env)
  res.status(200).send('Sample API response')
})


import multer from 'multer';
let FILE_DESTINATION = '/tmp';
var uploadStorageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log('environment is...', process.env.ENV);
      // console.log('whats up destination', file);
      cb(null, FILE_DESTINATION);
    },
    filename: function (req, file, cb) {
      console.log('hii', file);
      cb(null, `${file.originalname}`);
    }
});
var upload = multer({ storage: uploadStorageConfig });

app.post('/csv', upload.single('excel'), (req, res) => {
  const csvReader = csvtojson.csv();
  console.log('ENDPOINT', req.file);
  return csvReader.fromFile(req.file.path)
    .then(async (jsonObj)=>{
        console.log('READ at ', new Date(), ' jsonobj is', jsonObj);
        const tree = convertToOrganizationTree(jsonObj);
        const filePath = `${req.file.destination}/${req.file.filename}`;
        await uploadFile(filePath, req.file.filename);
        res.json(tree);
    })
    .catch((err) => {
      console.log('ERROR', err);
      res.json(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
