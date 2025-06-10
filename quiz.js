window.onload = function () {
  let timeLeft = 1200;

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

    if (timeLeft < 0) {
      clearInterval(countDown);
      timerDisplay.innerText = "Time's Up!";
    }
  }, 1000);
};

let que = document.querySelector("#question");
let optA = document.querySelector("#option-a");
let optB = document.querySelector("#option-b");
let optC = document.querySelector("#option-c");
let optD = document.querySelector("#option-d");
let nextBtn = document.querySelector("#next-btn");

const questions = [
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

let a = Math.floor(Math.random() * questions.length);
que.innerText = questions[a].question;
optA.innerText = questions[a].options.A;
optB.innerText = questions[a].options.B;
optC.innerText = questions[a].options.C;
optD.innerText = questions[a].options.D;

nextBtn.addEventListener("click", () => {
  a = Math.floor(Math.random() * (questions.length - 1));
  que.innerText = questions[a].question;
  optA.innerText = questions[a].options.A;
  optB.innerText = questions[a].options.B;
  optC.innerText = questions[a].options.C;
  optD.innerText = questions[a].options.D;

  enableOptions();
});

optA.addEventListener("click", () => {
  const selected = optA.getAttribute("data-option");
  if (selected === questions[a].answer) {
    optA.style.backgroundColor = "green";
  } else {
    optA.style.backgroundColor = "red";
  }
  disableOptions();
});

optB.addEventListener("click", () => {
  const selected = optB.getAttribute("data-option");
  if (selected === questions[a].answer) {
    optB.style.backgroundColor = "green";
  } else {
    optB.style.backgroundColor = "red";
  }
  disableOptions();
});

optC.addEventListener("click", () => {
  const selected = optC.getAttribute("data-option");
  if (selected === questions[a].answer) {
    optC.style.backgroundColor = "green";
  } else {
    optC.style.backgroundColor = "red";
  }
  disableOptions();
});

optD.addEventListener("click", () => {
  const selected = optD.getAttribute("data-option");
  if (selected === questions[a].answer) {
    optD.style.backgroundColor = "green";
  } else {
    optD.style.backgroundColor = "red";
  }
  disableOptions();
});

function disableOptions() {
  optA.disabled = true;
  optA.classList.remove("cursor-pointer");
  optA.classList.add("cursor-not-allowed");

  optB.disabled = true;
  optB.classList.remove("cursor-pointer");
  optB.classList.add("cursor-not-allowed");

  optC.disabled = true;
  optC.classList.remove("cursor-pointer");
  optC.classList.add("cursor-not-allowed");

  optD.disabled = true;
  optD.classList.remove("cursor-pointer");
  optD.classList.add("cursor-not-allowed");
}

function enableOptions() {
  optA.disabled = false;
  optA.classList.add("cursor-pointer");
  optA.classList.remove("cursor-not-allowed");
  optA.style.backgroundColor = "transparent";

  optB.disabled = false;
  optB.classList.add("cursor-pointer");
  optB.classList.remove("cursor-not-allowed");
  optB.style.backgroundColor = "transparent";

  optC.disabled = false;
  optC.classList.add("cursor-pointer");
  optC.classList.remove("cursor-not-allowed");
  optC.style.backgroundColor = "transparent";

  optD.disabled = false;
  optD.classList.add("cursor-pointer");
  optD.classList.remove("cursor-not-allowed");
  optD.style.backgroundColor = "transparent";
}
