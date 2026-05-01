import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const foodSelect = document.getElementById("foodSelect");
const locationInput = document.getElementById("locationInput");
const quantitySelect = document.getElementById("quantitySelect");
const collectBtn = document.getElementById("collectBtn");
const foodList = document.getElementById("foodList");


async function loadFoodPosts() {
  const snapshot = await getDocs(collection(db, "food_posts"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


async function populateFoodDropdown() {
  const foods = await loadFoodPosts();
  foodSelect.innerHTML = '<option value="">--Choose Food--</option>';


  const uniqueNames = [...new Set(foods.map(f => f.name))];
  uniqueNames.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    foodSelect.appendChild(opt);
  });

  foodSelect.addEventListener("change", () => {
    const selected = foods.find(f => f.name === foodSelect.value);
    if (selected) {
      locationInput.value = selected.location || "";
      quantitySelect.innerHTML = '<option value="">--Select Quantity--</option>';
      const maxQty = selected.quantity || 0;
      for (let i = 1; i <= maxQty; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        quantitySelect.appendChild(opt);
      }
    } else {
      locationInput.value = "";
      quantitySelect.innerHTML = '<option value="">--Select Quantity--</option>';
    }
  });
}


async function displayFoodList() {
  const foods = await loadFoodPosts();
  foodList.innerHTML = "";
  foods.forEach(f => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="food-name">${f.name}</div>
      <div class="location">Location: ${f.location}</div>
      <div class="quantity">Available: ${f.quantity || 0}</div>
      <div class="shelf-life">Shelf Life: ${f.shelf_life_days || "Not specified"}</div>
      <div class="collected">Collected: ${f.collectedQuantity || 0}</div>
    `;
    foodList.appendChild(div);
  });
}

collectBtn.addEventListener("click", async () => {
  const name = foodSelect.value;
  const location = locationInput.value;
  const quantity = parseInt(quantitySelect.value);

  if (!name || !location || !quantity) return alert("Select food, location, and quantity!");

  const foods = await loadFoodPosts();
  const selected = foods.find(f => f.name === name && f.location === location);
  if (!selected) return alert("Food not found in database!");

  const remainingQty = (selected.quantity || 0) - quantity;
  const newCollected = (selected.collectedQuantity || 0) + quantity;

  const docRef = doc(db, "food_posts", selected.id);

  if (remainingQty > 0) {
    await updateDoc(docRef, { quantity: remainingQty, collectedQuantity: newCollected });
  } else {
    await updateDoc(docRef, { quantity: 0, collectedQuantity: newCollected });
    
      }

  alert(`You collected ${quantity} of ${name}. Remaining: ${Math.max(0, remainingQty)}`);
  await populateFoodDropdown();
  await displayFoodList();

  
  foodSelect.value = "";
  locationInput.value = "";
  quantitySelect.innerHTML = '<option value="">--Select Quantity--</option>';
});


populateFoodDropdown();
displayFoodList();
