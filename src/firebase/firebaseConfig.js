import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: <apiKey>,
  authDomain: <authDomain>,
  projectId: <projectId>,
  storageBucket: <storageBucket>,
  messagingSenderId: <messagingSenderId> ,
  appId: <appId>,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
