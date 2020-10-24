import React, { useState, useEffect } from 'react';
import EnterName from './views/EnterName'
import CountDrivers from './views/CountDrivers'
import UploadSpreadsheet from './views/UploadSpreadsheet'
import RoutingList from './views/RoutingList'
import logo from './logo.svg';
import './App.css';
import './tailwind.output.css';

const VIEWS = {
  ENTER_NAME: 'Enter Name',
  COUNT_DRIVERS: 'Enter number of drivers',
  UPLOAD_SPREADSHEET: 'Upload spreadsheet',
  ROUTING_LIST: 'Router list'
}

function App() {
  const [view, setView] = useState(VIEWS.ROUTING_LIST)
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
}

export default App;
