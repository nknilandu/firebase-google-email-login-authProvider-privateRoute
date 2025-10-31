// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwvE4H4OolbsC1rIINuGqIBEHi5dLXKtI",
  authDomain: "fir-aurhprovider-example.firebaseapp.com",
  projectId: "fir-aurhprovider-example",
  storageBucket: "fir-aurhprovider-example.firebasestorage.app",
  messagingSenderId: "207126945741",
  appId: "1:207126945741:web:5cb247739cf72faef62e84",
  measurementId: "G-BQ70XK293F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);