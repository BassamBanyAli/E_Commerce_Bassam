import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtGnVSesTU04x0JIjr-0scSNV8h0wKN84",
    authDomain: "best-team-173b4.firebaseapp.com",
    projectId: "best-team-173b4",
    storageBucket: "best-team-173b4.appspot.com",
    messagingSenderId: "347062803002",
    appId: "1:347062803002:web:ac1fa2f00439420013f303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

// Facebook Auth Provider
const provider = new FacebookAuthProvider();

// Facebook login button
const facebookLogin = document.getElementById("facebook-login-btn");
if (facebookLogin) {
  facebookLogin.addEventListener("click", async function () {
    try {
      console.log("Button clicked, attempting Facebook login...");
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("User:", user);

      // Handle successful login here

    } catch (error) {
      console.error("Error during Facebook login:", error);
      alert("Error during login. Please try again.");
    }
  });
} else {
  console.error("Facebook login button not found");
}
