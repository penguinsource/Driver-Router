import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal'

// IMAGE URLs
const UP_ARROW = "https://storage.googleapis.com/publicapeedback/router/up-arrow.png"
const DOWN_ARROW = "https://storage.googleapis.com/publicapeedback/router/down-arrow.png"

const isSendRoutesBtnDisabled = (routes) => {
  let isDisabled = false
  Object.keys(routes).forEach(routeKey => {
    const route = routes[routeKey]
    if (!route.phone || !route.driverName || !route.email) {
      isDisabled = true;
    }
  })
  return isDisabled
}

const RoutingList = ({ responseData, reset }) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [data, setData] = useState(undefined)
  useEffect(() => {
    if (responseData && responseData.routes) {
      setData(responseData.routes)
      setIsDisabled(isSendRoutesBtnDisabled(responseData.routes))
    }
  }, [responseData])

  const update = (routeKey, valueKey, value) => {
    const route = data[routeKey]
    const newData = {
      ...data,
      [routeKey]: {
        ...route,
        [valueKey]: value
      }
    }
    setData(newData)
    setIsDisabled(isSendRoutesBtnDisabled(newData))
  }

  const sendRoutes = () => {
    setLoading(true)
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
        setLoading(false)
        setShowModal(true)
      })
  }

  const fillForms = () => {
    const newData = {...data}
    if (newData['0']) {
      newData['0'] = {
        ...newData['0'],
        driverName: 'Matt',
        phone: '5614453344',
        email: 'matt@getspeedback.com'
      }
    }
    if (newData['1']) {
      newData['1'] = {
        ...newData['1'],
        driverName: 'Mihai',
        phone: '9545361700',
        email: 'mihai@getspeedback.com'
      }
    }
    if (newData['2']) {
      newData['2'] = {
        ...newData['2'],
        driverName: 'David',
        phone: '5612893240',
        email: 'davidfromcali@gmail.com'
      }
    }
    if (newData['3']) {
      newData['3'] = {
        ...newData['3'],
        driverName: 'Gaby',
        phone: '5082844614',
        email: 'g.averypeck@gmail.com'
      }
    }
    if (newData['4']) {
      newData['4'] = {
        ...newData['4'],
        driverName: 'Sam',
        phone: '5612139375',
        email: 'samatnet4@gmail.com'
      }
    }
    setData(newData)
    setIsDisabled(false)
  }

  return (
    <div className="App bg-gray h-screen pb-12">
      <button className="absolute mr-3 mt-2 right-0" onClick={fillForms}>
        For Demo: Fill forms out
      </button>
      {
        loading ? (
          <img alt="loading" className="absolute" src="https://storage.googleapis.com/publicapeedback/router/loading.gif" />
        ) : null
      }
      {
        showModal ? (
          <Modal close={() => { setShowModal(false) }} classes="">
            <div>
              <img alt="loading" className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/success-icon.png" />
            </div>
            <p className="text-3xl mb-6 mt-5 font-bold">Sending Successful</p>
            <p className="text-xl">Way to go! Your routing information has been sent to your team.</p>
            <button onClick={() => { reset() }} className="mb-6 hover:bg-hover-red rounded-full shadow px-10 py-3 bg-red text-white mt-8 text-xl font-bold">
              Upload another list
            </button>
          </Modal>
        ) : null
      }
      <div className="">
        <img alt="loading" className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
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

            return (
              <div key={`${index}_${routeKey}`} className="pt-4 border-b-1 bg-white">
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
                        update(routeKey, 'driverName', e.target.value)
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
                        update(routeKey, 'phone', e.target.value)
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
                        update(routeKey, 'email', e.target.value)
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
                          <img alt="down-arrow" className="w-8" src={DOWN_ARROW} />
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
                          <img alt="up-arrow" className="w-8" src={UP_ARROW} />
                        </button>
                      )
                    }
                  </p>
                </div>
                {
                  show ? (
                    <div className="">
                      <iframe
                        title="google-maps-iframe"
                        width="100%"
                        height="450"
                        frameBorder="0"
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
          sendRoutes()
        }}
        disabled={isDisabled}
        className={`${isDisabled ? 'bg-disabled-gray' : 'hover:bg-hover-teal bg-teal'} rounded-full shadow px-10 py-3 text-white mt-8 text-xl font-bold`}
      >
        Send Route Info
      </button>
    </div>
  )
}

export default RoutingList
