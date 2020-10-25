const dotenv = require('dotenv');
dotenv.config({ path: `./config/dev.env` });

const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use((req, res, next) => {
  const origin = req.header('origin');
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  res.header("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

const AppManager = require('./resources/AppManager')
const SendSMS = require('./resources/SMS')
const Geocode = require('./resources/Geocode')

const port = 3005

app.use(express.static('./react/build'))

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())

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

// run()


// Endpoints below:

app.get('/api/sup', (req, res) => {
  const text = 'Hello World 2! here is sample api:' + process.env.SAMPLE_API_KEY + ', all others are:' + JSON.stringify(process.env)
  res.status(200).send('Sample API response')
})


const multer = require('multer');
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

app.post('/api/csv', upload.single('excel'), async (req, res) => {
  console.log('whats up duck', req.body)
  let { body: { drivers, agencyName } } = req
  const file = req.file

  console.log('drivers..', drivers, 'agency name ..', agencyName)

  const result = await AppManager.openExcel(drivers, file)
  return res.status(200).json(result)
});

app.post('/api/sendRoutes', async (req, res) => {
  let { body: { data } } = req
  const result = await AppManager.sendRoutesInfo(data)
  return res.status(200).json(result)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
