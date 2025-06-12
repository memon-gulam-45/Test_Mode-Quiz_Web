let welcomePart = document.querySelector("#welcome-part");
let startBtn = document.querySelector("#start-btn");
let loginPart = document.querySelector("#login-part");

let dark = document.querySelector("#dark");
let light = document.querySelector("#light");
let toggleBtn = document.querySelector("#toggle-button");

let root = document.querySelector("#root");

let form = document.querySelector("form");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let invalidMsg = document.querySelector("#invalid-msg");

startBtn.addEventListener("click", () => {
  welcomePart.classList.add("hidden");
  loginPart.classList.remove("hidden");
  localStorage.removeItem("quizFinished");
});

let mode =
  localStorage.getItem("mode") ||
  (root.classList.contains("dark") ? "dark" : "light");

if (mode === "dark") {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}
updateIcons();

toggleBtn.addEventListener("click", () => {
  if (mode === "dark") {
    mode = "light";
  } else {
    mode = "dark";
  }
  updateMode();
});

function updateMode() {
  if (mode === "light") {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
  localStorage.setItem("mode", mode);
  updateIcons();
  console.log(mode);
}

function updateIcons() {
  if (mode === "dark") {
    dark.classList.add("hidden");
    light.classList.remove("hidden");
  } else {
    dark.classList.remove("hidden");
    light.classList.add("hidden");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value === "memon_gulam_45" && password.value === "ghm0405") {
    invalidMsg.classList.add("hidden");
    console.log("Succesful");
    localStorage.setItem("quizStarted", "true");
    window.location.href = "./quiz.html";
  } else {
    invalidMsg.classList.remove("hidden");
    invalidMsg.innerText = "Invalid Credentials";
  }
});

window.onload = function () {
  if (localStorage.getItem("quizStarted") === "true") {
    window.location.href = "quiz.html";
  }
};
