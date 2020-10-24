import React, { useState, useEffect } from 'react';

const EnterName = ({ next }) => {
  const [name, setName] = useState('')
  return (
    <div className="App bg-gray h-screen">
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <img className="mx-auto mt-32 mb-8" src="https://storage.googleapis.com/publicapeedback/router/truck-icon.png" />
      <div className="w-auto text-center mx-auto">
        <p className="text-3xl mb-5 font-bold">Enter your agency name.</p>
        <input value={name} onChange={(e) => { setName(e.target.value) }} className="mx-auto w-64 px-3 py-2 rounded-sm text-center" type="text" placeholder="The Soup Kitchen" />
      </div>
      <button onClick={() => { next(name) }} class="hover:bg-hover-teal rounded-full shadow px-10 py-3 bg-teal text-white mt-8 text-xl font-bold">Next</button>
    </div>
  )
}

export default EnterName
