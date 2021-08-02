import React, { useState } from 'react'
import context from 'react-bootstrap/esm/AccordionContext';
import firebase from "../firebase";
import { Button } from 'react-bootstrap';


function selectDataByUid(serial) {
    return firebase.database().ref("data/" + serial).orderByChild("date").limitToLast(1);
}

function Home({ serial, clearSerial }) {
    const [mapdata, setMapdata] = useState();

    const getData = () => {
        const ref = selectDataByUid(serial);
        let array = [];
        ref.on("value", (snapshot) => {
            snapshot.forEach((el) => {
                const list = el.val();
                array.push({
                    hr_acc: list.hr_acc,
                    temp: list.temp
                })
            })
            //setMapdata(datas)
        });
        return array;
    }

    const logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then((response) => {
            clearSerial();
        });
    }
    return (<>
        <div>
            <ui>
                {getData().map((item) => {
                    return (
                        <li>{item.temp}</li>
                    )
                })}
            </ui>



        </div>
        <Button>logout</Button>
    </>
    )
}

export default Home
