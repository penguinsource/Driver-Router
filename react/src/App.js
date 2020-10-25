import React, { useState } from 'react';
import EnterName from './views/EnterName'
import CountDrivers from './views/CountDrivers'
import UploadSpreadsheet from './views/UploadSpreadsheet'
import RoutingList from './views/RoutingList'
import './App.css';
import './tailwind.output.css';

const VIEWS = {
  ENTER_NAME: 'Enter Name',
  COUNT_DRIVERS: 'Enter number of drivers',
  UPLOAD_SPREADSHEET: 'Upload spreadsheet',
  ROUTING_LIST: 'Router list'
}

function App() {
  const [view, setView] = useState(VIEWS.ENTER_NAME)
  const [data, setData] = useState({
    agencyAddress: '',
    drivers: 1,
    apiResponse: undefined
  })

  const upload = (file) => {
    try {
      const requestData = new FormData()
      requestData.append('excel', file)
      requestData.append('drivers', data.drivers)
      requestData.append('agencyAddress', data.agencyAddress)

      fetch('https://api-gsb.ngrok.io/api/csv', {
        method: 'POST',
        body: requestData
      })
      .then(response => response.json())
      .then(response => {
        setData({ ...data, apiResponse: response })
        setView(VIEWS.ROUTING_LIST)
      })
    } catch (err) {
      console.error('App.js upload error', err)
    }
  }

  if (view === VIEWS.ENTER_NAME) {
    return (
      <EnterName
        next={(agencyAddress) => {
          setData({ ...data, agencyAddress });
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
          upload(file)
        }}
      />
    )
  }

  if (view === VIEWS.ROUTING_LIST) {
    return (
      <RoutingList
        responseData={data.apiResponse}
        reset={() => { setView(VIEWS.ENTER_NAME) }}
      />
    )
  }
}

export default App;
