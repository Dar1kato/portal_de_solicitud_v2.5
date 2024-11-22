import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAn3xz4j62OD_w_PV0vkjQh7ia69TKaCQY",
    authDomain: "materialesdata.firebaseapp.com",
    databaseURL: "https://materialesdata-default-rtdb.firebaseio.com",
    projectId: "materialesdata",
    storageBucket: "materialesdata.firebasestorage.app",
    messagingSenderId: "337268076253",
    appId: "1:337268076253:web:964d795f74c64187f73534",
    measurementId: "G-J74VZ7NSGR"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const database = db;