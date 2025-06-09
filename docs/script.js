let welcomePart = document.querySelector("#welcome-part");
let startBtn = document.querySelector("#start-btn");
let loginPart = document.querySelector("#login-part");

let dark = document.querySelector("#dark");
let light = document.querySelector("#light");
let toggleBtn = document.querySelector("#toggle-button");

let root = document.querySelector("#root");

startBtn.addEventListener("click", () => {
  welcomePart.classList.add("hidden");
  loginPart.classList.remove("hidden");
});

let mode = root.classList.contains("dark") ? "dark" : "light";
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
