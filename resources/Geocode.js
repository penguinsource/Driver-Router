const fetch = require('node-fetch')

const geocode = {}

geocode.getLatLon = async (address) => {
  // const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+GOOGLE_API_KEY)
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+process.env.GOOGLE_API_KEY)
  const resp = await response.json()
  console.log('resp is', resp)
  // console.log('...', resp.results[0].geometry)
  return resp.results[0].geometry.location
}

module.exports = geocode
