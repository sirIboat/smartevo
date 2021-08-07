import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Container } from "react-bootstrap";
import "./Home.css";

import { Sparklines, SparklinesLine, } from 'react-sparklines';

function Home({ serial }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("datas/" + serial)
      .orderByChild("date")
      .limitToLast(1)
      .on("value", (snapshot) => {
        let array = [];
        snapshot.forEach((snap) => {
          array.push(snap.val());
          // console.log(array)
        });
        setData(array);
        console.log(data)
      });
  }, []);
  // data={[5, 10, 5, 20, 8, 15, 12, 32, 23, 12, 21, 2, 3, 44, 11, 22, 33, 11, 31, 21, 23, 32, 21]}
  return (
    <div className="home">
      <Container >
        {data.map((data) => {
          return (
            <div className='boxHome' key='data'>
              <div className='boxSpark'>
                <Sparklines data={data.hr_acc} style={{
                  background: "#212529"/* , maxWidth: '750px', maxHeight: '300px', */
                }} >
                  <SparklinesLine style={{ strokeWidth: 1, stroke: "#229954", fill: "none" }} />
                </Sparklines>
              </div>
              <div className='boxData'>
                <div class="row">
                  <div class="col-md-4">
                    <div className='boxHr'>
                      <h2>HR</h2>
                      <p>bpm</p>
                      <h1>{data.HR}</h1>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div className='row'>
                      <div class="col-md-6">
                        <div className='boxRr'>
                          <h2>RESP</h2>
                          <p>rpm</p>
                          <h1>{data.SPO2}</h1>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className='boxTemp'>
                          <h2>TEMP</h2>
                          <p>°C</p>
                          <h1>{data.SYS}</h1>
                        </div>
                      </div>
                      <div class="pb-3">
                        <h2>Status</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          )

        })}

      </Container>
    </div >
  );
}

export default Home;
