const express = require('express')
const app = express()

const SendSMS = require('./resources/SMS')
const Geocode = require('./resources/Geocode')

const port = 3000

app.use(express.static('./react/build'))


const fetch = require('node-fetch')

const SENDINBLUE_API_KEY = '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'


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
  // const hello = await Geocode.getLatLon('854 Broken Sound Pkwy NW, Boca Raton, FL 33487')
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]
    const hello = await Geocode.getLatLon(address)
    console.log('hello', i, 'is', hello)
  }
}

run()

// run()

// const sendSMS = async () => {
//   const response = await fetch('https://api.sendinblue.com/v3/transactionalSMS/sms', {
//     method: 'POST',
//     headers: {
//       'api-key': SENDINBLUE_API_KEY,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "type": "transactional",
//       "sender": "9545361700",
//       "recipient": "5614453344",
//       "content": "Testing SMS, whats up champ!"
//     })
//   })
//   console.log('response is', response)
//   const resp = await response.json()
//   console.log('resp is', resp)
// }

const sendSMS = async () => {
  const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/AC6d2852d119a9fb33b6f057b1ba5c433b/Messages.json', {
    method: 'POST',
    headers: {
      'api-key': SENDINBLUE_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "type": "transactional",
      "sender": "9545361700",
      "recipient": "5614453344",
      "content": "Testing SMS, whats up champ!"
    })
  })
  console.log('response is', response)
  const resp = await response.json()
  console.log('resp is', resp)
}

// sendSMS()

console.log('whats up...')

app.get('/api/sup', (req, res) => {
  res.send('Hello World 2!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
