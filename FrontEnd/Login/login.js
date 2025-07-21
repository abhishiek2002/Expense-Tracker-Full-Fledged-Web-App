import userClassInstance from "../Services/userServices.js";




const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;


  try {
    const res = await userClassInstance.login({ email, password });
    const token = res.data.token;

    localStorage.setItem("token", token);
    
    window.location.replace("../Expenses/expenses.html");
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = error.message;
    }

    const loginErrorField = document.getElementById("loginErrorField");
    loginErrorField.textContent = errorMessage;
  }
});
