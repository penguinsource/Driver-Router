const csvtojson = require('csvtojson')
const Geocode = require('./Geocode')

const AppManager = {}

AppManager.openExcel = async (drivers, fileObject) => {
  const csvReader = csvtojson.csv();
  
  const excelJSON = await csvReader.fromFile(fileObject.path)
  // console.log('excelJSON is', excelJSON)
  const addresses = excelJSON.map((data, index) => ({
    address: `${data.Address}`
  }))

  const promiseList = []
  for (let i = 0; i < Object.keys(addresses).length; i++) {
    const address = addresses[i]

    const geocodePromise = Geocode.getLatLon(addresses[i])
      .then(location => {
        address.location = location
      })
    promiseList.push(geocodePromise)
  }

  const promisesDone = await Promise.all(promiseList);  // wait for all geocode requests to finish..

  console.log('addresses with geolocations', addresses)

}

module.exports = AppManager
