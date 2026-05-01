import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const foodNameInput = document.getElementById("foodName");
const locationInput = document.getElementById("locationInput");
const quantityInput = document.getElementById("quantityInput");
const shelfLifeInput = document.getElementById("shelfLifeInput");
const postFoodBtn = document.getElementById("postFood");
const foodList = document.getElementById("donateFoodList"); // updated ID

async function loadFoodPosts() {
  const snapshot = await getDocs(collection(db, "food_posts"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function displayFoodList() {
  const data = await loadFoodPosts();
  foodList.innerHTML = "";

  data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

  data.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="food-name">${d.name}</div>
      <div class="location"> ${d.location}</div>
      <div class="quantity">Quantity: ${d.quantity}</div>
      <div class="shelf-life">Shelf Life: ${d.shelf_life_days}</div>
    `;
    foodList.appendChild(card);
  });
}

postFoodBtn.addEventListener("click", async () => {
  const name = foodNameInput.value.trim();
  const location = locationInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const shelfLife = parseInt(shelfLifeInput.value);

  if (!name || !location || !quantity || !shelfLife) {
    alert("Please fill in all fields before posting!");
    return;
  }

  try {
    await addDoc(collection(db, "food_posts"), {
      name,
      location,
      quantity,
      shelfLife,
      postedAt: new Date().toISOString()
    });

    alert(" Food item posted successfully!");

    foodNameInput.value = "";
    locationInput.value = "";
    quantityInput.value = "";
    shelfLifeInput.value = "";

    displayFoodList();
  } catch (error) {
    console.error("Error posting food:", error);
    alert("Error posting food. Please try again!");
  }
}

);

displayFoodList();
