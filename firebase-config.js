import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7YCjyyDsIse3zr35L6U7BV92lNQlJe20",
  authDomain: "tech-mode---quiz-web.firebaseapp.com",
  projectId: "tech-mode---quiz-web",
  storageBucket: "tech-mode---quiz-web.firebasestorage.app",
  messagingSenderId: "410403461740",
  appId: "1:410403461740:web:c5d6b467f6046eeb27d649",
  measurementId: "G-XF23H22QMX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
