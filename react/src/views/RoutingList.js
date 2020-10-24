import React, { useState, useEffect } from 'react';

const UP_ARROW = "https://storage.googleapis.com/publicapeedback/router/up-arrow.png"
const DOWN_ARROW = "https://storage.googleapis.com/publicapeedback/router/down-arrow.png"

const sample = {"success":true,"routes":{"0":{"link":"https://www.google.com/maps/dir/26.3976391,-80.1067828/26.3369831,-80.07121579999999/26.3386633,-80.2061394/","distance":16.8,"time":44,"embedMapUrl":"https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.3369831,-80.07121579999999&destination=26.3386633,-80.2061394"},"1":{"link":"https://www.google.com/maps/dir/26.3976391,-80.1067828/26.359936,-80.11565499999999/26.4149651,-80.1194131/26.4129184,-80.1070227/","distance":11.9,"time":31,"embedMapUrl":"https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.359936,-80.11565499999999|26.4149651,-80.1194131&destination=26.4129184,-80.1070227"}}}

const RoutingList = ({ responseData }) => {
  const [drivers, setDrivers] = useState(1)
  // const { routes } = responseData;
  // console.log('responseData is', responseData)
  // const routes = JSON.parse(sample).routes;
  console.log('sample', sample)
  const routes = sample.routes;

  return (
    <div className="App bg-gray h-screen">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <div className="mt-12 text-center mx-auto shadow w-5/6 border border-border-gray rounded-md">
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
          routes && Object.keys(routes).map((routeKey, index) => {
            const route = routes[routeKey]
            return (
              <div className="py-4 border-b-1 bg-white border-b border-border-gray">
                <p className="inline-block w-1/12 text-left align-top pt-1">Route {parseInt(index, 10) + 1}</p>
                <p className="inline-block w-1/12 text-left align-top pt-1">{ route.distance } miles</p>
                <p className="inline-block w-1/12 text-left align-top pt-1">{ route.time } minutes</p>
                <p className="inline-block w-1/12 text-left align-top pt-1">45 min</p>
                <p className="inline-block w-2/12 text-left align-top">
                  <input
                    type="text"
                    className="px-3 py-1 border border-input-border-gray rounded-sm"
                    placeholder="Driver Name"
                  />
                </p>
                <p className="inline-block w-2/12 text-left align-top">
                  <input
                    type="text"
                    className="px-3 py-1 border border-input-border-gray rounded-sm"
                    placeholder="954-536-1700"
                  />
                </p>
                <p className="inline-block w-2/12 text-left align-top">
                  <input
                    type="text"
                    className="px-3 py-1 border border-input-border-gray rounded-sm"
                    placeholder="matt@router.com"
                  />
                </p>
                <p className="inline-block w-1/12 pl-5">
                  <button><img className="w-8" src={UP_ARROW} /></button>
                </p>
              </div>
            )
          })
        }

        
      </div>
    </div>
  )
}

export default RoutingList
