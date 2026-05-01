import { db } from "../firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const totalPostsEl = document.getElementById("totalPosts");
const totalAvailableEl = document.getElementById("totalAvailable");
const totalCollectedEl = document.getElementById("totalCollected");
const activeLocationsEl = document.getElementById("activeLocations");

async function loadDashboardData() {
  try {
    const querySnapshot = await getDocs(collection(db, "food_posts"));

    let totalPosts = 0;
    let totalAvailable = 0;
    let totalCollected = 0;
    const locations = new Set();

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      totalPosts++;
      totalAvailable += data.quantity || 0;
      totalCollected += data.collectedQuantity || 0; 
      if (data.location) locations.add(data.location);
    });

    totalPostsEl.textContent = totalPosts;
    totalAvailableEl.textContent = totalAvailable;
    totalCollectedEl.textContent = totalCollected;
    activeLocationsEl.textContent = locations.size;

  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
}

loadDashboardData();
