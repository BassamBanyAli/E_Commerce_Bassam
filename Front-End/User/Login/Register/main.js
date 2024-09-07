import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
if (googleLogin) {
    googleLogin.addEventListener("click", async function () {
      try {
        console.log("Button clicked, attempting login...");
        const result = await signInWithPopup(auth, provider);
  
        const user = result.user;
        console.log("User:", user);
        
        var url = 'https://localhost:7000/api/Users_Bassam/Google';
        
        // Create FormData object and append user details
        var formData = new FormData();
        formData.append('displayName', user.displayName);
        formData.append('email', user.email);
        formData.append('photoURL', user.photoURL);
        
        try {
            var response = await fetch(url, {
                method: "POST",
                body: formData,
            });
        
            if (response.ok) {
                alert('Registered successfully with Google');
                window.location.href = "../editUserGoogle.html";
            } else {
                const errorData = await response.json();
                alert('Error: ' + (errorData.message || 'Registration failed'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering. Please try again.');
        }
        
    
        
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }));
  
      } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please try again.");
      }
    });
} else {
    console.error("Login button not found");
}
