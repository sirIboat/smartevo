import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Container } from "react-bootstrap";
import Chart from "react-apexcharts";
import './History.css'

function Test({ serial }) {
    const [data, setData] = useState([]);
    const [hr_acc, setHr_acc] = useState([]);

    useEffect(() => {
        firebase
            .database()
            .ref("data/" + serial)
            .orderByChild("date")
            .limitToLast(1)
            .on("value", (snapshot) => {
                let array = [];
                let array1 = [];
                snapshot.forEach((snap) => {
                    array.push(snap.val());
                    setHr_acc(snap.val().hr_acc);
                    // console.log(snap.val().hr_acc)

                });
                setData(array);

            });
    }, []);
    const unixTime = 1628084672;
    const date = new Date(unixTime * 1000);
    // console.log(date.toLocaleDateString("en-US"));


    const options = {
        chart: {
            id: "basic-bar"
        },

        xaxis: {
            // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }
    const series = [{
        name: "series-1",
        // data: [5, 4, 7, 8, 8, 7, 5, 6, 8, 7, 8, 7, 6, 7, 7, 6, 4, 4, 7, 11, 8, 6, 4, 3, 7, 1, 7, 3, 7, 3, 4, 6, 4, 7, 5, 5, 9, 10, 8, 8, 5, 8, 7, 6, 6, 12, 7, 10, 7, 6, 8, 9, 8, 7, 3, 4, 0, 4, 3, 5, 7, 6, 11, 8, 8, 3, 5, 3, 6, 10, 6, 9, 7, 9, 7, 9, 10, 6, 8, 7, 8, 9, 13, 10, 9, 7, 7, 8, 6, 6, 6, 10, 6, 7, 8, 4, 6, 1, 4, 0, 5, 4, 7, 8, 8, 7, 5, 6, 8, 7, 8, 7, 6, 7, 7, 6, 4, 4, 7, 11, 8, 6, 4, 3, 7, 1, 7, 3, 7, 3, 4, 6, 4, 7, 5, 5, 9, 10, 8, 8, 5, 8, 7, 6, 6, 12, 7, 10, 7, 6, 8, 9, 8, 7, 3, 4, 0, 4, 3, 5, 7, 6, 11, 8, 8, 3, 5, 3, 6, 10, 6, 9, 7, 9, 7, 9, 10, 6, 8, 7, 8, 9, 13, 10, 9, 7, 7, 8, 6, 6, 6, 10, 6, 7, 8, 4, 6, 1, 4, 0]
        data: hr_acc
    }]


    return (
        < div className="history" >
            <div className="row">
                <div className="mixed-chart">

                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        width="900"
                    />
                </div>



            </div>
        </div >
    );

}

export default Test
