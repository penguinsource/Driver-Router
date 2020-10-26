const dotenv = require('dotenv');
const envConfigPath = process.env.ENV_VAR_FILE ? process.env.ENV_VAR_FILE : './config/dev.env'
dotenv.config({ path: envConfigPath });
const express = require('express')
const bodyParser = require('body-parser')
const AppManager = require('./resources/AppManager')

const port = process.env.ENV === 'dev' ? 3005 : 8080
const app = express()

// Express app configuration:
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
app.use(express.static('./react/build'))
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())

// Form data configuration:
const multer = require('multer');
let FILE_DESTINATION = '/tmp';
var uploadStorageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, FILE_DESTINATION);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    }
});
var upload = multer({ storage: uploadStorageConfig });

// Endpoints:
app.get('/api/health', (req, res) => {
  res.status(200).send('Hello from Matt and Mihai!')
})

app.post('/api/csv', upload.single('excel'), async (req, res) => {
  let { body: { drivers, agencyAddress } } = req
  const file = req.file
  const result = await AppManager.openExcel(drivers, file, agencyAddress)
  return res.status(200).json(result)
});

app.post('/api/sendRoutes', async (req, res) => {
  let { body: { data } } = req
  const result = await AppManager.sendRoutesInfo(data)
  return res.status(200).json(result)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
