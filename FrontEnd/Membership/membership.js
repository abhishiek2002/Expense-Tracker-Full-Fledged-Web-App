// initialise cashfree
import { getPaymentSessionId } from "../Services/paymentService.js";

const cashfree = Cashfree({
  mode: "sandbox",
});

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

// handle event click on payment buttons

// const cashfree = Cashfree({
//   mode: "sandbox",
// });

const cardGrid = document.querySelector(".card-grid");

cardGrid.addEventListener("click", async (event) => {
  // check if it is basic payment btn
  if (event.target.classList.contains("basic")) {
    // get paymentSessionId
    const orderAmount = 850;
    const orderCurrency = "INR";

    try {
      const res = await getPaymentSessionId({
        orderAmount,
        orderCurrency,
      });
      console.log(res);
      const paymentSessionID = res.data.paymentSessionID;
      const checkoutOptions = {
        paymentSessionId: paymentSessionID,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.log("error", error);
    }
  }
  // check if it is premium payment btn
  else if (event.target.classList.contains("premium")) {
    // get paymentSessionId
    const orderAmount = 1275;
    const orderCurrency = "INR";

    try {
      const res = await getPaymentSessionId({
        orderAmount,
        orderCurrency,
      });
      console.log(res);
      const paymentSessionID = res.data.paymentSessionID;
      const checkoutOptions = {
        paymentSessionId: paymentSessionID,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.log("error", error);
    }
  }
});
