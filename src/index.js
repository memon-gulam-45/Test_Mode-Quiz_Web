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
  console.log(mode);
  localStorage.setItem("mode", mode);
  updateIcons();
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
