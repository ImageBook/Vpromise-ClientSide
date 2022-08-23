// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU0KPk-7ieKqX817IyzhGZtcYyVEmmsGU",
  authDomain: "vpromise-digilabsrnd.firebaseapp.com",
  projectId: "vpromise-digilabsrnd",
  storageBucket: "vpromise-digilabsrnd.appspot.com",
  messagingSenderId: "609957919747",
  appId: "1:609957919747:web:64721c9d9af692f2a4a236",
  measurementId: "G-BPWS0W7D3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;