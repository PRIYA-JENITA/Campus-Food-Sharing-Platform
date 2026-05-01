// /js/login.js
import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");


function getCredentials() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  return { email, password };
}


signupBtn.addEventListener("click", async () => {
  const { email, password } = getCredentials();

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    window.location.href = "donate.html";
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});


loginBtn.addEventListener("click", async () => {
  const { email, password } = getCredentials();

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "donate.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});