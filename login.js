import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const loginForm = document.querySelector("#login-form");
const invalidMsg = document.querySelector("#invalid-msg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const identifier = document
    .querySelector("#login-form #username")
    .value.trim();
  const enteredPasword = document.querySelector("#login-form #password").value;
  let foundUser = null;

  try {
    const usernameQuery = query(
      collection(db, "Registered-users"),
      where("username", "==", identifier)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      foundUser = usernameSnapshot.docs[0].data();
    }

    if (!foundUser) {
      const emailQuery = query(
        collection(db, "Registered-users"),
        where("email", "==", identifier)
      );
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        foundUser = emailSnapshot.docs[0].data();
      }
    }

    if (foundUser) {
      if (foundUser.password == enteredPasword) {
        console.log("Login successful:", foundUser.username || foundUser.email);
        localStorage.setItem("username", foundUser.username);
        localStorage.setItem("domain", foundUser.domain);
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.replace("quiz.html");
      } else {
        invalidMsg.textContent = "Incorrect password.";
        invalidMsg.classList.remove("hidden");
        invalidMsg.classList.add("text-red-600", "dark:text-red-300");
      }
    } else {
      invalidMsg.textContent = "User not found.";
      invalidMsg.classList.remove("hidden");
      invalidMsg.classList.add("text-red-600", "dark:text-red-300");
    }
  } catch (err) {
    console.error("Login error:", err);
    invalidMsg.innerText = "An error occurred during login.";
    invalidMsg.classList.remove("hidden");
    invalidMsg.classList.add("text-red-600", "dark:text-red-300");
  }
});

const inputs = loginForm.querySelectorAll("input");

inputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    invalidMsg.classList.add("hidden");
  });
});
