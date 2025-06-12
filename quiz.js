let displayQuesNo = document.querySelector("#display-ques-no");
let timeLeft = 1200;

function startTimer() {
  const timerDisplay = document.querySelector("#timer");

  const countDown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    let formattedTime =
      String(minutes).padStart(2, "0") +
      " : " +
      String(seconds).padStart(2, "0");

    timerDisplay.innerText = formattedTime;

    timeLeft--;
    saveProgress();

    if (timeLeft < 0) {
      clearInterval(countDown);
      timerDisplay.innerText = "Time's Up!";
      sessionStorage.removeItem("quizProgress");
    }
  }, 1000);
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

let questions;
const savedData = JSON.parse(sessionStorage.getItem("quizProgress"));

if (savedData && savedData.questions) {
  questions = savedData.questions;
} else {
  questions = [
    {
      question: "What is the capital of India?",
      options: {
        A: "Mumbai",
        B: "Delhi",
        C: "Ahmedabad",
        D: "Kolkata",
      },
      answer: "B",
    },

    {
      question: "What is the national sport of India?",
      options: {
        A: "Cricket",
        B: "Volley Ball",
        C: "Foot Ball",
        D: "Hockey",
      },
      answer: "D",
    },
  ];
  questions.sort(() => Math.random() - 0.5);
}

const options = [optA, optB, optC, optD];
let currIndex = 0;
let answeredQues = new Array(questions.length).fill(false);

displayQuesNo.innerText = `Question ${currIndex + 1} Of ${questions.length}`;

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

  if (answeredQues[currIndex] === true) {
    disableOptions();
  } else {
    enableOptions();
  }
}

showQuestion();

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
  saveProgress();
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
  saveProgress();
}

let score = 0;
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
  saveProgress();
}

function saveProgress() {
  const quizState = {
    currIndex,
    score,
    timeLeft,
    answeredQues,
    questions,
  };
  sessionStorage.setItem("quizProgress", JSON.stringify(quizState));
}

window.onload = function () {
  if (localStorage.getItem("quizFinished")) {
    alert("You've Already Submitted The Quiz...");
    window.location.href = "score.html";
    return;
  }

  const savedProgress = JSON.parse(sessionStorage.getItem("quizProgress"));

  if (savedProgress) {
    currIndex = savedProgress.currIndex || 0;
    score = savedProgress.score || 0;
    timeLeft = savedProgress.timeLeft || 1200;
    answeredQues =
      savedProgress.answeredQues || new Array(questions.length).fill(false);
  } else {
    timeLeft = 1200;
  }
  startTimer();
  showQuestion();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sessionStorage.removeItem("quizProgress");
  if (localStorage.getItem("quizStarted") === "true") {
    localStorage.removeItem("quizStarted");
  }
  localStorage.setItem("quizFinished", "true");
  localStorage.setItem("score", score);
  localStorage.setItem("totalQues", questions.length);
  window.location.href = "score.html";
});

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
