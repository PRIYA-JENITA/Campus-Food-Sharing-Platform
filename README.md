# 🍱 Campus Food Sharing Web App

A web-based platform to reduce food waste within campus by enabling students and staff to **donate, view, and collect surplus food** efficiently.

---

## 🚀 Features

* 🔐 **Authentication**

  * Login & Signup using Firebase Authentication
  * Restricted access to `@karunya.edu.in` email users

* 🍽️ **Donate Food**

  * Add food items with:

    * Name
    * Location
    * Quantity
    * Shelf Life
  * Stored in Firebase Firestore

* 🛍️ **Collect Food**

  * View available food items
  * Select quantity to collect
  * Updates remaining quantity in real-time

* 📊 **Dashboard**

  * View posted food items
  * Track donations and usage

* 🎨 **User Interface**

  * Clean green-themed UI
  * Responsive layout
  * Consistent navigation across pages

---

## 🧠 Innovation / Smart Features

* ♻️ Helps reduce food wastage on campus
* 📈 Tracks food usage and availability
* ⏳ Can be extended with expiry detection logic
* 📍 Can be enhanced with location-based filtering
* 📧 Email notification system (EmailJS integration)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Firebase
* **Database:** Firestore
* **Authentication:** Firebase Auth
* **Hosting:** Firebase Hosting

---

## 📂 Project Structure

```
campus-food-sharing/
│
├── public/
│   ├── index.html        # Login page
│   ├── donate.html       # Donate food page
│   ├── collect.html      # Collect food page
│   ├── dashboard.html    # Dashboard page
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── firebase-config.js
│   │   ├── app.js
│   │   ├── collect.js
│   │   └── dashboard.js
│   │
│   └── images/
│
├── firebase.json
├── .firebaserc
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/campus-food-sharing.git
cd campus-food-sharing
```

---

### 2️⃣ Install Firebase CLI

```
npm install -g firebase-tools
```

---

### 3️⃣ Login to Firebase

```
firebase login
```

---

### 4️⃣ Initialize Firebase (if not already)

```
firebase init
```

Select:

* Hosting
* Firestore

Set:

* Public directory → `public`
* Single page app → **No**

---

### 5️⃣ Add Firebase Configuration

Update `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
```

---

### 6️⃣ Run Locally

```
firebase serve
```

Open:

```
http://localhost:5000
```

---

### 7️⃣ Deploy to Firebase

```
firebase deploy
```

---

## 🔒 Firestore Rules (for testing)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ Note: Update rules for production security later.

---

## 🧪 Usage Flow

1. Signup using `@karunya.edu.in`
2. Login to access system
3. Donate food via Donate page
4. View & collect food via Collect page
5. Monitor activity via Dashboard

---

## 📸 Screenshots (Optional)

*Add screenshots of your UI here*

---

## 📌 Future Enhancements

* 📍 Location-based food discovery
* ⏳ Auto expiry detection
* 📊 Advanced analytics dashboard
* 🔔 Notifications system
* 🤖 ML-based food demand prediction

---

## 👩‍💻 Author

**Priya Jenita J**
**Siva Kalyani S**
**Maria Delphine A**
**Asmila D**

---

## ⭐ Contribute

Feel free to fork this repo and improve features!

---

## 📜 License

This project is for educational purposes.

