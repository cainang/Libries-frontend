import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCIc6zmZiBqS5oQ_5rg5YiRTZyhKQOPUuA",
    authDomain: "libries-73b51.firebaseapp.com",
    databaseURL: "https://libries-73b51.firebaseio.com",
    projectId: "libries-73b51",
    storageBucket: "libries-73b51.appspot.com",
    messagingSenderId: "508928749586",
    appId: "1:508928749586:web:4e9eb58bf46800deaee8cb",
    measurementId: "G-3C8BME8GWZ"
});

export default app;
