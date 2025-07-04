let displayQuesNo = document.querySelector("#display-ques-no");

if (sessionStorage.getItem("isLoggedIn") !== "true") {
  window.location.replace("login.html");
}

let que = document.querySelector("#question");
let optA = document.querySelector("#option-a");
let optB = document.querySelector("#option-b");
let optC = document.querySelector("#option-c");
let optD = document.querySelector("#option-d");
let previousBtn = document.querySelector("#previous-btn");
let nextBtn = document.querySelector("#next-btn");
let submitBtn = document.querySelector("#submit-btn");
let form = document.querySelector("form");

import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

let questions = [];
const options = [optA, optB, optC, optD];
let currIndex = 0;
let answeredQues = [];
let score = 0;
let domain = localStorage.getItem("domain");

let timeLeft;

async function fetchQuestions() {
  const stored = localStorage.getItem("questions");
  if (stored) {
    questions = JSON.parse(stored);
    answeredQues =
      JSON.parse(localStorage.getItem("answeredQues")) ||
      new Array(questions.length).fill(false);
    currIndex = parseInt(localStorage.getItem("currIndex")) || 0;
    score = parseInt(localStorage.getItem("score")) || 0;
    timeLeft =
      parseInt(localStorage.getItem("timeLeft")) || questions.length * 30;

    displayQuesNo.innerText = `Question ${currIndex + 1} Of ${
      questions.length
    }`;
    showQuestion();
    return;
  }

  const querySnapshot = await getDocs(collection(db, domain));
  querySnapshot.forEach((ques) => {
    questions.push(ques.data());
  });
  questions.sort(() => Math.random() - 0.5);

  localStorage.setItem("questions", JSON.stringify(questions));
  answeredQues = new Array(questions.length).fill(false);
  localStorage.setItem("answeredQues", JSON.stringify(answeredQues));
  timeLeft = questions.length * 30;
  localStorage.setItem("timeLeft", timeLeft);

  displayQuesNo.innerText = `Question ${currIndex + 1} Of ${questions.length}`;
  showQuestion();
}

function startTimer() {
  fetchQuestions().then(() => {
    timeLeft =
      parseInt(localStorage.getItem("timeLeft")) || questions.length * 30;
  });

  const timerDisplay = document.querySelector("#timer");

  const countDown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    let formattedTime =
      String(minutes).padStart(2, "0") +
      " : " +
      String(seconds).padStart(2, "0");

    timerDisplay.innerText = formattedTime;

    if (timeLeft <= 0) {
      timerDisplay.textContent = "00 : 00";
      clearInterval(countDown);
      alert("Time's Up!, Your Quiz Is Submitted");
      handleForm();
      return;
    }
    timeLeft--;
    localStorage.setItem("timeLeft", timeLeft);
  }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  startTimer();
});

function showQuestion() {
  let q = questions[currIndex];

  que.innerText = q.question;
  optA.innerText = q.options.A;
  optB.innerText = q.options.B;
  optC.innerText = q.options.C;
  optD.innerText = q.options.D;

  if (currIndex === 0) {
    previousBtn.disabled = true;
  }

  if (answeredQues[currIndex]) {
    disableOptions();
  } else {
    enableOptions();
  }
}

nextBtn.addEventListener("click", handleNext);

function handleNext() {
  currIndex++;
  if (currIndex < questions.length) {
    displayQuesNo.innerText = `Question ${currIndex + 1} Of ${
      questions.length
    }`;

    showQuestion();

    previousBtn.disabled = false;

    if (currIndex == questions.length - 1) {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    } else {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
  } else {
    currIndex--;
    showQuestion();

    return;
  }
  localStorage.setItem("currIndex", currIndex);
}

previousBtn.addEventListener("click", handlePrevious);

function handlePrevious() {
  if (currIndex > 0) {
    currIndex--;
    displayQuesNo.innerText = `Question ${currIndex + 1} Of ${
      questions.length
    }`;
    showQuestion();

    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");

    if (currIndex === 0) {
      previousBtn.disabled = true;
    }
  }
  localStorage.setItem("currIndex", currIndex);
}

function optionClick(selectedOption) {
  disableOptions();
  let correct = questions[currIndex].answer;
  let selected = selectedOption.getAttribute("data-option");

  if (selected === correct) {
    score++;
    console.log(score);
  } else {
    console.log(score);
  }

  answeredQues[currIndex] = true;
  if (currIndex < questions.length - 1) {
    handleNext();
  }

  localStorage.setItem("score", score);
  localStorage.setItem("answeredQues", JSON.stringify(answeredQues));
  localStorage.setItem("currIndex", currIndex);
}

import {
  addDoc,
  serverTimestamp,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleForm();
});

async function handleForm() {
  localStorage.removeItem("questions");
  localStorage.removeItem("score");
  localStorage.removeItem("currIndex");
  localStorage.removeItem("answeredQues");
  localStorage.removeItem("timeLeft");

  localStorage.removeItem("quizStarted");
  localStorage.setItem("score", score);
  localStorage.setItem("totalQues", questions.length);

  const quizData = {
    username: localStorage.getItem("username"),
    score: localStorage.getItem("score"),
    totalQuestions: localStorage.getItem("totalQues"),
    domain: localStorage.getItem("domain"),
    quizGiven: true,
    timeStamp: serverTimestamp(),
  };

  console.log(quizData);
  try {
    const docRef = await addDoc(collection(db, "Attempted-users"), quizData);
    console.log("Succesful");
    setTimeout(() => {
      window.location.replace("thankyou.html");
    }, 100);
  } catch (err) {
    console.log("Error in adding data", err);
  }

  sessionStorage.clear();
}

const check = query(
  collection(db, "Attempted-users"),
  where("username", "==", localStorage.getItem("username"))
);

const userData = await getDocs(check);

if (userData.exists) {
  alert("You have already attempted the quiz.");
  window.location.replace("index.html");
}

optA.addEventListener("click", () => {
  optionClick(optA);
});

optB.addEventListener("click", () => {
  optionClick(optB);
});

optC.addEventListener("click", () => {
  optionClick(optC);
});

optD.addEventListener("click", () => {
  optionClick(optD);
});

function disableOptions() {
  options.forEach((opt) => {
    opt.disabled = true;
    opt.classList.remove("bg-transparent");
    opt.classList.add("bg-gray-200");
    opt.classList.add("dark:bg-gray-900");
    opt.classList.remove("cursor-pointer");
    opt.classList.add("cursor-not-allowed");
  });
}

function enableOptions() {
  options.forEach((opt) => {
    opt.disabled = false;
    opt.classList.add("bg-transparent");
    opt.classList.remove("bg-gray-200");
    opt.classList.remove("dark:bg-gray-900");
    opt.classList.add("cursor-pointer");
    opt.classList.remove("cursor-not-allowed");
  });
}
