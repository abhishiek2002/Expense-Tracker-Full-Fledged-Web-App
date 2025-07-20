const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = signupForm.username.value;
  const email = signupForm.email.value;
  const password = signupForm.email.password;

  try {
    const res = await axios.post("http://localhost:3000/user/signup", {
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error.message);
    const errorField = document.getElementById("errorField");
    errorField.textContent = error.message;
  }
});
