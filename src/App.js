import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import Login from "./components/Login/Login";
import useSerial from "./components/Login/useSerial";
import Home from './components/Home/Home'
import Navbar from "./components/Navbar/Navbar";


function App() {
  const { serial, setSerial, clearSerial } = useSerial();

  if (!serial) {
    return (
      <div className="App">
        <Login setSerial={setSerial} />

      </div >
    );
  }

  return (
    <div className="dextop">

      <BrowserRouter>
        <Navbar user={serial} clearSerial={clearSerial} />
        <Switch>
          <Route>
            <Home serial={serial} clearSerial={clearSerial} />
          </Route>
        </Switch>
      </BrowserRouter >

    </div>

  );
}

export default App;