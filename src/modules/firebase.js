import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvG2SIvWs-WMIGW7CIB0INPAw7oO0lhGY",
  authDomain: "hailhelp-1476e.firebaseapp.com",
  projectId: "hailhelp-1476e",
  storageBucket: "hailhelp-1476e.appspot.com",
  messagingSenderId: "711403582473",
  appId: "1:711403582473:web:c1c7649f0182ec1e2db4d8"
};

const app = initializeApp(firebaseConfig);
const authenticator = getAuth(app);

const db = getFirestore(app);

// if(process.env.REACT_APP_MODE === 'development'){
//     connectFirestoreEmulator(db, 'localhost', 8080)
// }

export { authenticator, db }