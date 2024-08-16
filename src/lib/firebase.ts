import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-flashcard-6fbec.firebaseapp.com",
  projectId: "ai-flashcard-6fbec",
  storageBucket: "ai-flashcard-6fbec.appspot.com",
  messagingSenderId: "670098925103",
  appId: "1:670098925103:web:374d8f2a934f2787aa08da",
  measurementId: "G-357ES6RFYL",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
