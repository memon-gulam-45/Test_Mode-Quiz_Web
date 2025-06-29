let whiteCover = document.querySelector("#white-cover");
let blackCover = document.querySelector("#black-cover");

let dark = document.querySelector("#dark");
let light = document.querySelector("#light");
let toggleBtn = document.querySelector("#toggle-button");

let root = document.querySelector("#root");

let mode = root.classList.contains("dark") ? "dark" : "light";

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

let sideBar = document.querySelector("#sidebar");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let animateLine = document.querySelector("#animate-line");

btn1.addEventListener("click", () => {
  btn1.classList.add("active");
  animateLine.style.height = "25%";
});
btn2.addEventListener("click", () => {
  animateLine.style.height = "50%";
});
btn3.addEventListener("click", () => {
  animateLine.style.height = "75%";
});
btn4.addEventListener("click", () => {
  animateLine.style.height = "100%";
});

let header = document.querySelector("header");
let main = document.querySelector("main");
let navBtn = document.querySelector("#nav-btn");
let closeNav = document.querySelector("#close-nav");
let openNav = document.querySelector("#open-nav");

let isNavopen = false;

navBtn.addEventListener("click", () => {
  if (isNavopen == true) {
    closeNavbar();

    isNavopen = false;
  } else if (isNavopen === false) {
    openSidebar();

    isNavopen = true;
  }
});

function openSidebar() {
  closeNav.classList.add("hidden");
  openNav.classList.remove("hidden");
  sideBar.classList.remove("hidden");

  header.classList.remove("w-full");
  header.classList.add("w-10/12");

  main.classList.remove("w-full");
  main.classList.add("w-10/12");
}

function closeNavbar() {
  header.classList.add("w-full");
  header.classList.remove("w-10/12");

  main.classList.add("w-full");
  main.classList.remove("w-10/12");

  closeNav.classList.remove("hidden");
  openNav.classList.add("hidden");
  sideBar.classList.add("hidden");
}

header.addEventListener("click", () => {
  closeNavbar();
});

main.addEventListener("click", () => {
  closeNavbar();
});
