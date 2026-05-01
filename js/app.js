// app.js
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  addDoc,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// DOM Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const postFood = document.getElementById("postFood");
const foodName = document.getElementById("foodName");
const locationInput = document.getElementById("location");
const foodList = document.getElementById("foodList");
const authSection = document.getElementById("auth-section");
const foodSection = document.getElementById("food-section");

// Signup
signup.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Signup successful!");
  } catch (error) {
    alert(error.message);
  }
});

// Login
login.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
});

// Logout
logout.addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out");
});

// Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    foodSection.style.display = "block";
    logout.style.display = "block";
    loadFoodPosts();
  } else {
    authSection.style.display = "block";
    foodSection.style.display = "none";
    logout.style.display = "none";
  }
});

// Add Food Post
postFood.addEventListener("click", async () => {
  try {
    await addDoc(collection(db, "food_posts"), {
      name: foodName.value,
      location: locationInput.value,
      postedAt: new Date().toISOString(),
    });
    foodName.value = "";
    locationInput.value = "";
  } catch (error) {
    alert(error.message);
  }
});

// Load Food Posts in Real-Time
function loadFoodPosts() {
  onSnapshot(collection(db, "food_posts"), (snapshot) => {
    foodList.innerHTML = "";
    snapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = `${doc.data().name} - ${doc.data().location}`;
      foodList.appendChild(li);
    });
  });
}
