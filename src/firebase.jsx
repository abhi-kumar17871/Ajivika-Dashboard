import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  databaseURL: "https://safety-e5277-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "safety-e5277",
  storageBucket: "safety-e5277.appspot.com",
  messagingSenderId: "544793084123",
  appId: "1:544793084123:web:ee5fa8633eea956c808cfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = getDatabase(app);

export { db };