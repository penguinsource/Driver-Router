const fetch = require('node-fetch')

const geocode = {}

geocode.getLatLon = async (address) => {
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+process.env.GOOGLE_API_KEY)
  const resp = await response.json()
  console.log('response for address', address, 'response', resp)
  return resp.results[0].geometry.location
}

module.exports = geocode
