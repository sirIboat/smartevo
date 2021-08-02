import React, { useState, useEffect } from 'react'
import context from 'react-bootstrap/esm/AccordionContext';
import firebase from "../firebase";


function Home({ serial }) {

    const [data, setData] = useState([]);


    useEffect(() => {
        firebase.database().ref("data/" + serial).orderByChild("date").limitToLast(1).on("value", snapshot => {
            let array = [];
            snapshot.forEach(snap => {
                array.push(snap.val());
            });
            setData(array);
        });

    }, [])

    return (
        <div>
            {data.map(data => {
                return (
                    <p >{data.temp}</p>
                );
            })}
        </div >

    )
}

export default Home
