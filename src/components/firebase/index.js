import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6GESepgVZbwizo-C_oJ-LZHLr3tv7iw8",
    authDomain: "evoallstar-01.firebaseapp.com",
    databaseURL: "https://evoallstar-01-default-rtdb.firebaseio.com",
    projectId: "evoallstar-01",
    storageBucket: "evoallstar-01.appspot.com",
    messagingSenderId: "229199850691",
    appId: "1:229199850691:web:8fbfb0004f9346b00f4676",
    measurementId: "G-MMEKCMJSC8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;