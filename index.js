let startQuiz = document.querySelector("#start-quiz");
let register = document.querySelector("#register");
let startQuizLink = document.querySelector("#start-quiz-link");
let registerLink = document.querySelector("#register-link");
let animateIndicator = document.querySelector("#animate-indicator");

startQuizLink.addEventListener("click", () => {
  startQuiz.classList.remove("hidden");
  register.classList.add("hidden");
  animateIndicator.style.left = "0%";
});

registerLink.addEventListener("click", () => {
  startQuiz.classList.add("hidden");
  register.classList.remove("hidden");
  animateIndicator.style.left = "58.5%";
});

let whiteCover = document.querySelector("#white-cover");
let blackCover = document.querySelector("#black-cover");

let dark = document.querySelector("#dark");
let light = document.querySelector("#light");
let toggleBtn = document.querySelector("#toggle-button");

let root = document.querySelector("#root");

let form = document.querySelector("form");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let invalidMsg = document.querySelector("#invalid-msg");

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
    whiteCover.classList.remove("hidden");
    blackCover.classList.add("hidden");
  } else {
    mode = "dark";
    whiteCover.classList.add("hidden");
    blackCover.classList.remove("hidden");
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
