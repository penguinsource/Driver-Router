import React from 'react';
import logo from './logo.svg';
import './App.css';
import './tailwind.output.css';

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
