const csvtojson = require('csvtojson')
const Geocode = require('./Geocode')
const MapRoutes = require('./MapRoutes/MapRoutes')

const AppManager = {}

AppManager.openExcel = async (drivers, fileObject) => {
  const csvReader = csvtojson.csv();
  
  const excelJSON = await csvReader.fromFile(fileObject.path)
  const addresses = excelJSON.map((data, index) => ({
    name: `${data.Address}`
  }))

  const promiseList = []
  for (let i = 0; i < Object.keys(addresses).length; i++) {
    const address = addresses[i]

    const geocodePromise = Geocode.getLatLon(addresses[i].name)
      .then(location => {
        address.lon = location.lng
        address.lat = location.lat
      })
    promiseList.push(geocodePromise)
  }

  const promisesDone = await Promise.all(promiseList);  // wait for all geocode requests to finish..
  const routes = await MapRoutes.getShortestRoutes(undefined, addresses, drivers)
  console.log('routes', routes)

  return {
    success: true,
    routes
  }
}

module.exports = AppManager
