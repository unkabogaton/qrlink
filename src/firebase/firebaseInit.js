import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA2ZIlLIKxSRLJzQOqMUqjL3fe0-U5bqkY",
  authDomain: "jutz-7cb30.firebaseapp.com",
  projectId: "jutz-7cb30",
  storageBucket: "jutz-7cb30.appspot.com",
  messagingSenderId: "364642752676",
  appId: "1:364642752676:web:ec897d5edda67562bf2e31",
  measurementId: "G-5DHTCG3NNE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()