// Firebase configuration (User to replace placeholders)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase only if config is provided (prevents errors during development before config is added)
let db = null;
let app = null;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log("Firebase initialized");
} else {
  console.warn("Firebase config is missing. Firestore will not be available.");
}

export { db, app };
