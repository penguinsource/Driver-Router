import React, { useState, useEffect } from 'react';

const UploadSpreadsheet = ({ submit }) => {
  const [drivers, setDrivers] = useState(1)
  const [loading, setLoading] = useState(false)

  return (
    <div className="App bg-gray h-screen">
      {
        loading ? (
          <img className="absolute" src="https://storage.googleapis.com/publicapeedback/router/loading.gif" />
        ) : null
      }
      <div className="">
        <img className="mx-auto pt-10" src="https://storage.googleapis.com/publicapeedback/router/router-logo.png" />
      </div>
      <img className="mx-auto mt-32 mb-8" src="https://storage.googleapis.com/publicapeedback/router/file-icon.png" />
      <div className="w-auto text-center mx-auto">
        <p className="text-3xl mb-5 font-bold">Find and upload your list file.</p>
        <input
          onChange={(e) => {
            setLoading(true)
            submit(e.target.files[0])
          }}
          type="file"
          className="custom-file-input"
        />
      </div>
      <div>
        <p className="text-2xl mt-16 mb-6 text-dark-gray">How to format your spreadsheet</p>
        <img className="mx-auto mb-8" src="https://storage.googleapis.com/publicapeedback/router/format-example.png" />
      </div>
    </div>
  )
}

export default UploadSpreadsheet
