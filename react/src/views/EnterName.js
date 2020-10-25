import React, { useState, useEffect } from 'react';
import unsortedAgencies from './agencies'

const initialAgency = unsortedAgencies.find(agency => agency.name === "31749 C Boca Helping Hands- West Boca")
const agencies = unsortedAgencies.sort((a, b) => (a.name > b.name) ? 1 : -1)

const EnterName = ({ next }) => {
  const [address, setAddress] = useState(initialAgency.address)

  return (
    <div className="App bg-gray h-screen">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <img className="mx-auto mt-32 mb-8" src="https://storage.googleapis.com/publicapeedback/router/truck-icon.png" />
      <div className="w-auto text-center mx-auto">
        <p className="text-3xl mb-5 font-bold">Enter your agency name.</p>
        <select className="p-2" value={address} onChange={(e) => { setAddress(e.target.value) }}>
          {
            agencies.map(option => (
              <option value={option.address}>{ option.name }</option>
            ))
          }
        </select>
      </div>
      <button
        onClick={() => {
          next(address)
        }}
        className="hover:bg-hover-teal rounded-full shadow px-10 py-3 bg-teal text-white mt-8 text-xl font-bold"
      >
        Next
      </button>
    </div>
  )
}

export default EnterName
