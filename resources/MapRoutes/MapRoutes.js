const fetch = require('node-fetch')
const moment = require('moment')

const MapRoutes = {}

// const sampleBody = {
//   depot: {
//     lat: 26.3976391,
//     lon: -80.1067828,
//     name: "850 Broken Sound Parkway Northwest, Boca Raton, FL, USA",
//   },
//   locations: [
//     {
//       lat: 26.3976533,
//       lon: -80.10714639999999,
//       name: "854 Broken Sound Parkway Northwest, Boca Raton, FL, USA",
//     },
//     {
//       lat: 26.4049305,
//       lon: -80.1680086,
//       name: "6318 Somerset Cir, Boca Raton, FL 33496, USA"
//     },
//     {
//       lat: 26.457825,
//       lon: -80.09448,
//       name: "250 Congress Park Dr, Delray Beach, FL 33445, USA"
//     },
//     {
//       lat: 26.3541154,
//       lon: -80.08530859999999,
//       name: "Mizner Park, 327 Plaza Real, Boca Raton, FL 33432, USA"
//     }
//   ],
//   hasFinish: false,
//   loop: true,
//   override: false,
//   realTime: false,
//   reloadable: true,
//   reversible: false,
//   showPlaces: false,
//   startHour: 8,
//   startTime: 0,
//   timeboxing: false,
//   uploadAvailable: true,
//   vehicles: 3
// }

const sampleOrigin = {
  lat: 26.3976391,
  lon: -80.1067828,
  name: "850 Broken Sound Parkway Northwest, Boca Raton, FL, USA",
}

const sampleLocationList = [
  {
    lat: 26.3976533,
    lon: -80.10714639999999,
    name: "854 Broken Sound Parkway Northwest, Boca Raton, FL, USA",
  },
  {
    lat: 26.4049305,
    lon: -80.1680086,
    name: "6318 Somerset Cir, Boca Raton, FL 33496, USA"
  },
  {
    lat: 26.457825,
    lon: -80.09448,
    name: "250 Congress Park Dr, Delray Beach, FL 33445, USA"
  },
  {
    lat: 26.3541154,
    lon: -80.08530859999999,
    name: "Mizner Park, 327 Plaza Real, Boca Raton, FL 33432, USA"
  }
]

const getRequestData = (originObj, locationList, drivers) => {
  return {
    depot: originObj,
    locations: locationList,
    hasFinish: false,
    loop: true,
    override: false,
    realTime: false,
    reloadable: true,
    reversible: false,
    showPlaces: false,
    startHour: 8,
    startTime: 0,
    timeboxing: false,
    uploadAvailable: true,
    vehicles: drivers
  }
}

const SHORT_SAMPLE = require('./sampleData/short')

MapRoutes.mapRoutesWithDrivers = (originObj, locationList, mapResponse) => {
  const { route: routeList, vehicles } = mapResponse
  let driverRouteLinks = {}
  routeList.forEach((routeList, driverIndex) => {
    let link = 'https://www.google.com/maps/dir/'
    const distance = vehicles[parseInt(driverIndex, 10)].miles
    const time = vehicles[parseInt(driverIndex, 10)].minutes
    let embedMapUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_API_KEY}&origin=${originObj.lat},${originObj.lon}`
    if (routeList.length > 2) {
      embedMapUrl += `&waypoints=`
    }

    // go through each route destination and build embed link and maps link
    routeList.forEach((routeIndex, index) => {
      if (parseInt(routeIndex, 10) === 0) {
        return link += originObj.lat + ',' + originObj.lon + '/'
      }
      const locationObject = locationList[parseInt(routeIndex, 10) - 1]
      link += locationObject.lat + ',' + locationObject.lon + '/'

      const isLastWaypoint = routeList.length === parseInt(index) + 1;
      const isBeforeLastWaypoint = routeList.length === parseInt(index) + 2;
      if (isLastWaypoint) {
        embedMapUrl += `&destination=${locationObject.lat},${locationObject.lon}`
      } else {
        if (isBeforeLastWaypoint) {
          embedMapUrl += `${locationObject.lat},${locationObject.lon}`
        } else {
          embedMapUrl += `${locationObject.lat},${locationObject.lon}|`
        }
      }
    })
    // console.log('humanized time is', moment.duration({"minutes": time}).humanize())

    driverRouteLinks[driverIndex] = {
      link,
      distance,
      time,
      embedMapUrl,
    }
  })
  return driverRouteLinks
}


// 3rd party service which has no authentication validation
MapRoutes.getShortestRoutes = async (originObj = sampleOrigin, locationList, drivers) => {
  try {
    const body = getRequestData(originObj, locationList, drivers)

    // USE REAL DATA:
    // const response = await fetch("http://www.speedyroute.com/optimize", {
    //   "headers": {
    //     "accept": "application/json, text/javascript, */*; q=0.01",
    //     "accept-language": "en-US,en;q=0.9",
    //     "content-type": "application/json; charset=UTF-8",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "x-requested-with": "XMLHttpRequest",
    //     "cookie": "NB_SRVID=srv463014; _ga=GA1.2.321464341.1603508406; _gid=GA1.2.259064887.1603508406; G_ENABLED_IDPS=google; crisp-client%2Fsession%2F70883267-fc8e-4ab4-a994-92a19f938485=session_c30d5e4b-93c8-404f-a6cf-2f69e391f842; __stripe_sid=ee3bf36b-cd61-4a38-a075-66c7e2e7e0fcfa1eea; __stripe_mid=6ce582ed-71b4-4dc0-9b19-b36ae492ddf5956bc3; _gat=1"
    //   },
    //   "referrer": "https://www.speedyroute.com/",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": JSON.stringify(body),
    //   "method": "POST",
    //   "mode": "cors"
    // });
    // const resp = await response.json()
    // console.log('MAP ROUTE RESPONSE TO SAVE:', resp)
    // return MapRoutes.mapRoutesWithDrivers(originObj, locationList, response);


    // USE SAMPLE DATA:
    console.log('I AM USING A SAMPLE RESPONSE')
    return MapRoutes.mapRoutesWithDrivers(originObj, locationList, SHORT_SAMPLE.responseData);
  } catch (err) {
    console.error('MapRoutes.getShortestRoutes API error', err)
    console.error('MapRoutes.getShortestRoutes use sample data instead!')
    return MapRoutes.mapRoutesWithDrivers(originObj, locationList, SHORT_SAMPLE.responseData);
  }
}

module.exports = MapRoutes
