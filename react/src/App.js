import React, { useState, useEffect } from 'react';
import EnterName from './views/EnterName'
import CountDrivers from './views/CountDrivers'
import UploadSpreadsheet from './views/UploadSpreadsheet'
import RoutingList from './views/RoutingList'
import logo from './logo.svg';
import './App.css';
import './tailwind.output.css';

const UP_ARROW = "https://storage.googleapis.com/publicapeedback/router/up-arrow.png"
const DOWN_ARROW = "https://storage.googleapis.com/publicapeedback/router/down-arrow.png"

const VIEWS = {
  ENTER_NAME: 'Enter Name',
  COUNT_DRIVERS: 'Enter number of drivers',
  UPLOAD_SPREADSHEET: 'Upload spreadsheet',
  ROUTING_LIST: 'Router list'
}

function App() {
  const [view, setView] = useState(VIEWS.UPLOAD_SPREADSHEET)
  const [data, setData] = useState({
    agencyName: '',
    drivers: 1,
    apiResponse: undefined
  })

  if (view === VIEWS.ENTER_NAME) {
    return (
      <EnterName
        next={(agencyName) => {
          setData({ ...data, agencyName });
          setView(VIEWS.COUNT_DRIVERS)
        }}
      />
    )
  }

  if (view === VIEWS.COUNT_DRIVERS) {
    return (
      <CountDrivers
        next={(drivers) => {
          setData({ ...data, drivers });
          setView(VIEWS.UPLOAD_SPREADSHEET)
        }}
      />
    )
  }

  if (view === VIEWS.UPLOAD_SPREADSHEET) {
    return (
      <UploadSpreadsheet
        submit={(file) => {
          const requestData = new FormData()
          requestData.append('excel', file)
          requestData.append('drivers', data.drivers)
          requestData.append('agencyName', data.agencyName)

          fetch('https://api-gsb.ngrok.io/api/csv', {
            method: 'POST',
            body: requestData
          })
          .then(response => response.json())
          .then(response => {
            console.log('response is', response)
            setData({ ...data, apiResponse: response })
            setView(VIEWS.ROUTING_LIST)
          })
        }}
      />
    )
  }

  if (view === VIEWS.ROUTING_LIST) {
    return (
      <RoutingList
        responseData={data.apiResponse}
      />
    )
  }

  return (
    <div className="App bg-gray">
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

        <div className="py-4 border-b-1 bg-white">
          <p className="inline-block w-1/12 text-left align-top pt-1">Route 1</p>
          <p className="inline-block w-1/12 text-left align-top pt-1">13</p>
          <p className="inline-block w-1/12 text-left align-top pt-1">26.5</p>
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
      </div>
    </div>
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React HELLO!
        </a>

        <div>
          <div class="w-3/6 inline-block">hello</div>
          <div class="w-2/6 inline-block">hello</div>
        </div>
        <iframe
          width="600"
          height="450"
          frameborder="0"
          src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyB1lsjXlikz-q7pMNliSGsoVE7zXB_wTcY&origin=26.3976391,-80.1067828&waypoints=26.359936,-80.11565499999999|26.4149651,-80.1194131&destination=26.4129184,-80.1070227"
          allowFullScreen
        >
        </iframe>

        <input type="file" onChange={(e) => {
          console.log('change???', e.target.files)
          const data = new FormData()
          data.append('excel', e.target.files[0])
          data.append('drivers', 2)

          fetch('https://api-gsb.ngrok.io/api/csv', {
            method: 'POST',
            body: data
          })
          .then(response => response.json())
          .then(response => {
            console.log('response is', response)
          })
        }} />
      </header>
    </div>
  );
}

export default App;
