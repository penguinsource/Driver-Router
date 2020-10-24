import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
        <input type="file" onChange={(e) => {
          console.log('change???', e.target.files)
          const data = new FormData()
          data.append('excel', e.target.files[0])

          fetch('https://api-gsb.ngrok.io/api/csv', {
            method: 'POST',
            body:data
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
