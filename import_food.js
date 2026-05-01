const admin = require("firebase-admin");
const serviceAccount = require("./campusfoodsharing-firebase-adminsdk-fbsvc-084c909835.json"); 
const foodData = require("./indian_food_posts.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


foodData.forEach(async (item) => {

  const itemWithTimestamp = {
    ...item,
    postedAt: admin.firestore.Timestamp.fromDate(new Date(item.postedAt))
  };

  await db.collection("food_posts").add(itemWithTimestamp);
  console.log(`Added: ${item.name}`);
});
