import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "./Home.css";

function Home({ serial }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("data/" + serial)
      .orderByChild("date")
      .limitToLast(1)
      .on("value", (snapshot) => {
        let array = [];
        snapshot.forEach((snap) => {
          array.push(snap.val());
        });
        setData(array);
      });
  }, []);

  return (
    <div className="home">
      {data.map((data) => {
        return <p>{data.temp}</p>;
      })}
    </div>
  );
}

export default Home;
