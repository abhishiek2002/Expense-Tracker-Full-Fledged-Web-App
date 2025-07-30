import { getPaymentStatus } from "../utils/paymentService.js";
// import { URLSearchParams } from "url";

const h1El = document.querySelector("h1");
const loadingEl = document.querySelector(".loading");
const notificationEl = document.getElementById("notification");

document.addEventListener("DOMContentLoaded", () => {
  // get status
  getStatus();

  // loading animation
  loadingAnimation(0);
});

function loadingAnimation(index) {
  if (index > 3) index = 1;
  let str = "";

  for (let i = 0; i < index; i++) {
    str += ".";
  }

  loadingEl.textContent = `${str}`;

  setTimeout(() => {
    loadingAnimation(index + 1);
  }, 300);
}

async function getStatus() {
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  const orderID = params.orderID;
  console.log(orderID);

  try {
    const res = await getPaymentStatus(orderID);
    const orderStatus = res.data.orderStatus;
    showResponse(orderStatus);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

function showResponse(orderStatus) {
  showNotification(orderStatus);

  if (orderStatus === "Success") {
    h1El.textContent = "Success ✅";
  } else if (orderStatus === "Failure") {
    h1El.textContent = "Failed ❌!";
    h1El.style.color = red;
  }
}

function showNotification(orderStatus) {
  const heading =
    orderStatus === "Success" ? `${orderStatus} ✅` : `${orderStatus} ❌`;
  const message =
    orderStatus === "Success"
      ? "Transaction successfully done!"
      : "Transaction failed, Sorry for inconvience!";
  const background =
    orderStatus === "Success"
      ? "rgba(152, 255, 152, 0.6)"
      : "rgba(255, 0, 0, 0.7)";
  const color = orderStatus === "Success" ? `black` : `white`;

  notificationEl.querySelector("h4").textContent = heading;
  notificationEl.style.background = background;
  notificationEl.style.color = color;
  notificationEl.querySelector("p").textContent = message;
  notificationEl.style.transform = "translateX(-50%) translateY(0px)";

  setTimeout(() => {
    notificationEl.style.transform = "translateX(-50%) translateY(-200px)";
  }, 3000);
}
