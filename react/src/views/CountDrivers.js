import React, { useState, useEffect } from 'react';

const CountDrivers = ({ next }) => {
  const [drivers, setDrivers] = useState(1)

  return (
    <div className="App bg-gray h-screen">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <img className="mx-auto mt-32 mb-8" src="https://storage.googleapis.com/publicapeedback/router/drivers-icon.png" />
      <div className="w-auto text-center mx-auto">
        <p className="text-3xl mb-5 font-bold">How many drivers do you have today?</p>
        <select className="px-4 py-2" onChange={(e) => { setDrivers(e.target.value) }}>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(value => {
              return (
                <option key={value}>{ value }</option>
              )
            })
          }
        </select>
      </div>
      <button onClick={() => { next(drivers) }} className="hover:bg-hover-teal rounded-full shadow px-10 py-3 bg-teal text-white mt-8 text-xl font-bold">Next</button>
    </div>
  )
}

export default CountDrivers
