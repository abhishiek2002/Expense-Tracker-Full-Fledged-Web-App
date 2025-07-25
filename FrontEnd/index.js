import userClassInstance from "./Services/userServices.js";

window.addEventListener("DOMContentLoaded", () => {
  // on load verify , is user login aur not and then make header dynamic
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));  

  if (isLogin) {
    
    const loginBtns = document.querySelectorAll(".loginBtn");
    const signupBtns = document.querySelectorAll(".signupBtn");
    const invisibleBtns = document.querySelectorAll(".invisible");

    loginBtns.forEach((btn) => btn.classList.add("invisible"));
    signupBtns.forEach((btn) => btn.classList.add("invisible"));

    invisibleBtns.forEach((btn) => btn.classList.remove("invisible"));
  }

  // on load , indicator tab applying
  const indicator = document.querySelector("#indicator");
  const dailyExpense = document.getElementById("dailyExpense");
  const rect = dailyExpense.getBoundingClientRect();

  indicator.style.left = `${rect.left - rect.width}px`;
  indicator.style.width = `${rect.width}px`;

  // now it's time to load the expenses
});

// tab indicator animation ----------------------
const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector("#indicator");

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    const targetEl = event.target;
    const rect = targetEl.getBoundingClientRect();

    const width = rect.width;
    const leftPos = rect.left - width;

    const index = targetEl.getAttribute("tabindex");
    console.log(indicator, index);

    // indicator.style.transform = `translateX(${index * 100}%)`;
    indicator.style.left = `${leftPos}px`;
    indicator.style.width = `${width}px`;

    tabs.forEach((tab) => tab.classList.remove("active"));
    targetEl.classList.add("active");
  });
});

// menu bar handling

const menuBtn = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const menuBar = document.getElementById("menuBar");
  menuBar.style.transform = "translateX(0%)";
});

const removeBarBtn = document.getElementById("removeBarBtn");
removeBarBtn.addEventListener("click", () => {
  const menuBar = document.getElementById("menuBar");
  menuBar.style.transform = "translateX(100%)";
});

// logout click functionality

const logoutBtn = document.querySelectorAll(".logoutBtn");

logoutBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    userClassInstance.logout();
  });
});
