// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { authApp } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAh_czQE6AgG9PJrDmBAFn4D5bqYFzqlcE",
//   authDomain: "inventory-management-rea-20efd.firebaseapp.com",
//   // databaseURL: "https://mini-hakathon-f16b3-default-rtdb.firebaseio.com",
//   projectId: "mini-hakathon-f16b3",
//   storageBucket: "mini-hakathon-f16b3.appspot.com",
//   messagingSenderId: "83470708454",
//   appId: "1:199722486764:android:3b601751a13527b0734ec9"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAtEUuOlNDaOfgxoB_gGTVq55KX8DZJ3hI",
  authDomain: "mini-hakathon-f16b3.firebaseapp.com",
  databaseURL: "https://mini-hakathon-f16b3-default-rtdb.firebaseio.com",
  projectId: "mini-hakathon-f16b3",
  storageBucket: "mini-hakathon-f16b3.appspot.com",
  messagingSenderId: "199722486764",
  appId: "1:199722486764:web:a32c67118f78d039734ec9"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const authApp = authApp(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
