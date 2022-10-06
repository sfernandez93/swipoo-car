import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBm1D5naxd-VmfI1lpPyNWN0JpnN7HR_Xo",
  authDomain: "transfer-car-588b5.firebaseapp.com",
  databaseURL: "https://transfer-car-588b5-default-rtdb.firebaseio.com",
  projectId: "transfer-car-588b5",
  storageBucket: "transfer-car-588b5.appspot.com",
  messagingSenderId: "40132666709",
  appId: "1:40132666709:web:9b77dcab86cf7fee4efbdc"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage();
export const database = getDatabase(firebaseApp);