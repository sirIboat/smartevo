import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/database";

async function loginUser({ email, password }) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
    });
}

async function selectUserByUid(response) {
  console.log(response.uid);
  return firebase.database().ref("mapserial/" + response.uid);
}

function Login({ setSerial }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });
      const ref = await selectUserByUid(response.user);
      ref.on(
        "value",
        (snapshot) => {
          const data = snapshot.val();
          //console.log(data.serialnumber);
          setSerial(data.serialnumber);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
    } catch (error) { }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <form className="from-login" onSubmit={onSubmit}>
            <h2 className="text-center mb-4">Log In</h2>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <br />
              <Button type="submit" className="w-100" variant="success">
                Sign in
              </Button>
            </Form.Group>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
