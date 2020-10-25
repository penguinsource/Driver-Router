import React, { useState, useEffect } from 'react';

const UP_ARROW = "https://storage.googleapis.com/publicapeedback/router/up-arrow.png"
const DOWN_ARROW = "https://storage.googleapis.com/publicapeedback/router/down-arrow.png"

const sample = {"success":true,"routes":{"0":{"link":"https://www.google.com/maps/dir/26.3976391,-80.1067828/26.3369831,-80.07121579999999/26.3386633,-80.2061394/","distance":16.8,"time":44,"embedMapUrl":"https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.3369831,-80.07121579999999&destination=26.3386633,-80.2061394","stops":2},"1":{"link":"https://www.google.com/maps/dir/26.3976391,-80.1067828/26.359936,-80.11565499999999/26.4149651,-80.1194131/26.4129184,-80.1070227/","distance":11.9,"time":31,"embedMapUrl":"https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.359936,-80.11565499999999|26.4149651,-80.1194131&destination=26.4129184,-80.1070227","stops":3}}}
// const veryShortSample = {"success":true,"routes":{"0":{"link":"https://www.google.com/maps/dir/26.3976391,-80.1067828/26.3369831,-80.07121579999999/25.6262721,-80.3916639/","distance":71.2,"time":98,"humanizedTime":true,"embedMapUrl":"https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.3369831,-80.07121579999999&destination=25.6262721,-80.3916639","stops":2}}}

const RoutingList = ({ responseData }) => {
  // const { routes } = responseData;
  // const [data, setData] = useState(undefined)
  // useEffect(() => {
  //   setData(responseData.routes)
  // }, [responseData])

  Object.keys(sample.routes).forEach(routeKey => {
    const route = sample.routes[routeKey]
    route.phone = route.phone ? route.phone : ''
    route.driverName = route.driverName ? route.driverName : ''
    route.email = route.email ? route.email : ''
  })
  const [data, setData] = useState(sample.routes)

  return (
    <div className="App bg-gray h-screen pb-12">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <div className="mt-12 text-center mx-auto shadow w-5/6 border border-border-gray rounded-md mb-6">
        <div className="py-4 border-b-1 bg-light-gray rounded-md border-b border-border-gray rounded-b-none">
          <p className="inline-block w-1/12 text-left">ROUTE</p>
          <p className="inline-block w-1/12 text-left">STOPS</p>
          <p className="inline-block w-1/12 text-left">DISTANCE</p>
          <p className="inline-block w-1/12 text-left">DURATION</p>
          <p className="inline-block w-2/12 text-left pl-2">DRIVER</p>
          <p className="inline-block w-2/12 text-left">PHONE</p>
          <p className="inline-block w-2/12 text-left">EMAIL</p>
          <p className="inline-block w-1/12 text-left"></p>
        </div>

        {
          data && Object.keys(data).map((routeKey, index) => {
            const route = data[routeKey]
            const show = data[routeKey].show

            // return (
            //   <RouteRow
            //     route={route}
            //     update={() => {
                  
            //     }}
            //   />
            // )

            return (
              <div key={`${index}_${route.link}`} className="pt-4 border-b-1 bg-white">
                <div className="border-b border-border-gray pb-3">
                  <p className="inline-block w-1/12 text-left align-top pt-1">Route {parseInt(index, 10) + 1}</p>
                  <p className="inline-block w-1/12 text-left align-top pt-1">{ route.stops }</p>
                  <p className="inline-block w-1/12 text-left align-top pt-1">{ route.distance} mi</p>
                  <p className="inline-block w-1/12 text-left align-top pt-1">{ route.time } min</p>
                  <p className="inline-block w-2/12 text-left align-top">
                    <input
                      type="text"
                      value={route.driverName}
                      onChange={(e) => {
                        setData({
                          ...data,
                          [routeKey]: {
                            ...route,
                            driverName: e.target.value
                          }
                        })
                      }}
                      className="px-3 py-1 border border-input-border-gray rounded-sm"
                      placeholder="Driver Name"
                    />
                  </p>
                  <p className="inline-block w-2/12 text-left align-top">
                    <input
                      type="text"
                      value={route.phone}
                      onChange={(e) => {
                        setData({
                          ...data,
                          [routeKey]: {
                            ...route,
                            phone: e.target.value
                          }
                        })
                      }}
                      className="px-3 py-1 border border-input-border-gray rounded-sm"
                      placeholder="954-536-1700"
                    />
                  </p>
                  <p className="inline-block w-2/12 text-left align-top">
                    <input
                      type="text"
                      className="px-3 py-1 border border-input-border-gray rounded-sm"
                      placeholder="matt@router.com"
                      value={route.email}
                      onChange={(e) => {
                        setData({
                          ...data,
                          [routeKey]: {
                            ...route,
                            email: e.target.value
                          }
                        })
                      }}
                    />
                  </p>
                  <p className="inline-block w-1/12 pl-5">
                    {
                      show ? (
                        <button
                          onClick={() => {
                            setData({
                              ...data,
                              [routeKey]: { ...data[routeKey], show: !show }
                            })
                          }}
                        >
                          <img className="w-8" src={DOWN_ARROW} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setData({
                              ...data,
                              [routeKey]: { ...data[routeKey], show: !show }
                            })
                          }}
                        >
                          <img className="w-8" src={UP_ARROW} />
                        </button>
                      )
                    }
                  </p>
                </div>
                {
                  show ? (
                    <div className="">
                      <iframe
                        width="100%"
                        height="450"
                        frameborder="0"
                        src={route.embedMapUrl}
                        allowFullScreen
                      />
                    </div>
                  ) : null
                }
              </div>
            )
          })
        }
      </div>

      <button
        onClick={() => {
          fetch('https://api-gsb.ngrok.io/api/sendRoutes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data
            })
          })
            .then(response => response.json())
            .then(response => {
              console.log('send routes response', response)
            })
        }}
        class="hover:bg-hover-teal rounded-full shadow px-10 py-3 bg-teal text-white mt-8 text-xl font-bold"
      >
        Send Route Info
      </button>
    </div>
  )
}

export default RoutingList
