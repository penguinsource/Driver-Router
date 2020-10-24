const express = require('express')
const app = express()


const port = 3000

app.use(express.static('./react/build'))


const fetch = require('node-fetch')

const SENDINBLUE_API_KEY = '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'
const GOOGLE_API_KEY = 'AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY'


// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=YOUR_API_KEY

const run = async () => {
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+GOOGLE_API_KEY)
  const resp = await response.json()
  console.log('resp is', resp)

  console.log('...', resp.results[0].geometry)
}

// run()


console.log('whats up...')

app.get('/api/sup', (req, res) => {
  res.send('Hello World 2!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
