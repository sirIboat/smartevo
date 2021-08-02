import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from "./components/Login/Login";
import useSerial from "./components/Login/useSerial";
import Home from './components/Home/Home'

function App() {
  const { serial, setSerial, clearSerial } = useSerial();

  if (!serial) {
    return (
      <div className="App">
        <div className="outer">
          <Login setSerial={setSerial} />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="outer">
        <BrowserRouter>
          {/* <Navbar user={serial} clearUser={clearSerial} /> */}
          <Switch>
            <Home serial={serial} clearSerial={clearSerial} />
          </Switch>
        </BrowserRouter >
      </div>
    </div>

  );
}

export default App;