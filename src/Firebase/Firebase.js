import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9KM7pS_Gu5dw0K-wewX6PnxwKOinzIUM",
    authDomain: "slack-clone-9418b.firebaseapp.com",
    databaseURL: "https://slack-clone-9418b.firebaseio.com",
    projectId: "slack-clone-9418b",
    storageBucket: "slack-clone-9418b.appspot.com",
    messagingSenderId: "129428807590",
    appId: "1:129428807590:web:f7ea35d58825b623c23967",
    measurementId: "G-KCGSVVCZP5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};

export default db;