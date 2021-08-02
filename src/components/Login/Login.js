import React, { useState } from 'react';

import firebase from "../firebase";
import "firebase/auth";
import "firebase/database";


async function loginUser({ email, password }) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

async function selectUserByUid(response) {
    console.log(response.uid)
    return firebase.database().ref("mapserial/" + response.uid);
}

function Login({ setSerial }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            email,
            password
        });
        const ref = await selectUserByUid(response.user);
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data.serialnumber);
            setSerial(data.serialnumber)
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }

    return (
        <form className="{styles.form}" onSubmit={onSubmit}>
            <h3 >Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-signin btn-lg btn-block ">
                Sign in
            </button>
        </form>
    );
}

export default Login;