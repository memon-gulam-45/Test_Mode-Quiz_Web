import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const registrationForm = document.querySelector("#registration-form");
const invalidMsg = document.querySelector("#invalid-msg");

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullname: registrationForm.fullname.value.trim(),
    dob: registrationForm.dob.value,
    mobileNo: registrationForm["mobile-no"].value.trim(),
    domain: registrationForm["internship-domain"].value,
    course: registrationForm.course.value.trim(),
    branch: registrationForm.branch.value.trim(),
    college: registrationForm.college.value.trim(),
    university: registrationForm.university.value.trim(),
    collegeType: registrationForm["college-type"].value,
    city: registrationForm.city.value.trim(),
    email: registrationForm.email.value.trim(),
    username: registrationForm.username.value.trim(),
    password: registrationForm.password.value,
    confirmPassword: registrationForm["confirm-password"].value,
    timeStamp: serverTimestamp(),
  };

  console.log(data);

  if (data.password !== data.confirmPassword) {
    invalidMsg.textContent = "Password didn't match!";
    invalidMsg.classList.add("text-red-600", "dark:text-red-300");
    invalidMsg.classList.remove("text-green-600", "dark:text-green-300");
    invalidMsg.classList.remove("hidden");
    return;
  }

  try {
    const check = query(
      collection(db, "registrations"),
      where("email", "==", data.email)
    );
    const check2 = query(
      collection(db, "registrations"),
      where("username", "==", data.username)
    );

    const [emailSnap, usernameSnap] = await Promise.all([
      getDocs(check),
      getDocs(check2),
    ]);

    if (!emailSnap.emoty || !usernameSnap.empty) {
      invalidMsg.textContent = "Email or Username Already Registered";
      invalidMsg.classList.remove("text-red-600", "dark:text-red-300");
      invalidMsg.classList.add("text-green-600", "dark:text-green-300");
      invalidMsg.classList.remove("hidden");
      return;
    }

    const docRef = await addDoc(collection(db, "registrations"), data);
    console.log("Document Written with ID :", docRef.id);
    invalidMsg.textContent = "Registration Succesful!";
    alert("Registration Succesful!");
    console.log("Document Written with ID :", docRef.id);
    invalidMsg.classList.remove("text-red-600", "dark:text-red-300");
    invalidMsg.classList.add("text-green-600", "dark:text-green-300");
    invalidMsg.classList.remove("hidden");
    registrationForm.reset();
    window.location.replace("index.html");
  } catch (err) {
    console.error("Error adding document:", err);
    invalidMsg.textContent = "Error: Could not register.";
    invalidMsg.classList.add("text-red-600", "dark:text-red-300");
    invalidMsg.classList.remove("text-green-600", "dark:text-green-300");
    invalidMsg.classList.remove("hidden");
  }
});

const inputs = registrationForm.querySelectorAll("input, select");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    invalidMsg.classList.add("hidden");
  });
});
