import React from 'react'
import { Button } from 'react-bootstrap';
import firebase from "../firebase";
import "firebase/auth";
import './Navbar.css'


function Navbar({ serial, clearSerial }) {


    const logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            clearSerial();
        });
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <label>Smart Pulz</label>
                <div className="">
                    <span>
                        <Button onClick={logout} variant="danger" >logout</Button>
                    </span>
                </div>
            </Navbar>

        </>
    )
}

export default Navbar
