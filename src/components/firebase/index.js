import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqgnusFsxjrQtZCXgxycy2EkmzS7iHC6o",
    authDomain: "centraleyebedside.firebaseapp.com",
    databaseURL: "https://carver.asia-southeast1.firebasedatabase.app/",
    projectId: "centraleyebedside",
    storageBucket: "centraleyebedside.appspot.com",
    messagingSenderId: "155962434601",
    appId: "1:155962434601:web:9f94554ec3e022d3852838",
    measurementId: "G-MQWRNXVXYY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;