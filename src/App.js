import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import useSerial from "./components/Login/useSerial";
import Home from "./components/Home/Home";
import Menubar from "./components/Navbar/Menubar";
import History from "./components/History/History";
import AppE from './components/ExportData/AppE'



function App() {
  const { serial, setSerial, clearSerial } = useSerial();

  if (!serial) {
    return (
      <div className="App">
        <Login setSerial={setSerial} />
      </div>
    );
  }

  return (
    <div className="Web">
      <BrowserRouter>
        <Menubar user={serial} clearSerial={clearSerial} />
        <Switch>
          {/* <Route exact path='/'> <Home serial={serial} clearSerial={clearSerial} /></Route> */}
          <Route exact path='/'> <History serial={serial} clearSerial={clearSerial} /></Route>
          {/* <Route path='/test'> <AppE /></Route> */}

        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
