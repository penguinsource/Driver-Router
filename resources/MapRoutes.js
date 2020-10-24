const MapRoutes = {}

const body = {
  depot: {
    lat: 26.3976391,
    lon: -80.1067828,
    name: "850 Broken Sound Parkway Northwest, Boca Raton, FL, USA",
  },
  locations: [
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
  ],
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
  vehicles: 3
}

// 3rd party service which has no authentication implements th
MapRoutes.getShortestRoutes = async () => {
  const response = await fetch("http://www.speedyroute.com/optimize", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "NB_SRVID=srv463014; _ga=GA1.2.321464341.1603508406; _gid=GA1.2.259064887.1603508406; G_ENABLED_IDPS=google; crisp-client%2Fsession%2F70883267-fc8e-4ab4-a994-92a19f938485=session_c30d5e4b-93c8-404f-a6cf-2f69e391f842; __stripe_sid=ee3bf36b-cd61-4a38-a075-66c7e2e7e0fcfa1eea; __stripe_mid=6ce582ed-71b4-4dc0-9b19-b36ae492ddf5956bc3; _gat=1"
    },
    "referrer": "https://www.speedyroute.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify(body),
    "method": "POST",
    "mode": "cors"
  });
  const resp = await response.json()
  console.log('response is', resp)
}

module.exports = MapRoutes
