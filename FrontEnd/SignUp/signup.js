import userClassInstance from "../Services/userServices.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = signupForm.username.value;
  const email = signupForm.email.value;
  const password = signupForm.email.password;

  try {
    const res = await userClassInstance.signup({ name, email, password });

    // if (res.response.data.success === false) {
    //   throw new Error(res.response.data.error);
    // }
  } catch (error) {
    let errorValue;
    if (error.response) {
      errorValue = error.response.data.error;
    } else {
      errorValue = error.message;
    }
    const errorField = document.getElementById("errorField");
    errorField.textContent = errorValue;
  }
});
