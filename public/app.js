import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


const foodSelect = document.getElementById("foodSelect");
const locationInput = document.getElementById("locationInput");
const quantitySelect = document.getElementById("quantitySelect");
const postFoodBtn = document.getElementById("postFood");
const foodList = document.getElementById("foodList");


async function loadFoodPosts() {
  const snapshot = await getDocs(collection(db, "food_posts"));
  const docsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return docsArray;
}


async function populateDropdowns() {
  const data = await loadFoodPosts();


  const uniqueFoods = [...new Set(data.map(d => d.name))];

  foodSelect.innerHTML = '<option value="">--Choose Food--</option>';
  uniqueFoods.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    foodSelect.appendChild(opt);
  });


  foodSelect.addEventListener("change", () => {
    const selectedFood = foodSelect.value;
    const foodData = data.find(d => d.name === selectedFood);
    if (foodData) {
      locationInput.value = foodData.location;
      quantitySelect.innerHTML = '<option value="">--Select Quantity--</option>';
      for (let i = 1; i <= foodData.quantity; i++) {
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


postFoodBtn.addEventListener("click", async () => {
  const name = foodSelect.value;
  const location = locationInput.value;
  const quantity = parseInt(quantitySelect.value);
  if (!name || !location || !quantity) return alert("Select food, location, and quantity!");
  
  await addDoc(collection(db, "food_posts"), {
    name,
    location,
    quantity,
    postedAt: new Date().toISOString()
  });

  foodSelect.value = "";
  locationInput.value = "";
  quantitySelect.innerHTML = '<option value="">--Select Quantity--</option>';

  displayFoodList(); 
});


async function displayFoodList() {
  const data = await loadFoodPosts();
  foodList.innerHTML = "";
  data.sort((a,b)=>new Date(b.postedAt) - new Date(a.postedAt)).forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="food-name">${d.name}</div>
      <div class="location">Location: ${d.location}</div>
      <div class="quantity">Quantity: ${d.quantity}</div>
    `;
    foodList.appendChild(card);
  });
}


populateDropdowns();
displayFoodList();
