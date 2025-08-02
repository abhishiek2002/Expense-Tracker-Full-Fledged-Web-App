import Password from "../utils/passwordService";

window.addEventListener("DOMContentLoaded", () => {
    new ResetPassword();
});

class ResetPassword {
  constructor() {
    this.resetPasswordForm = document.getElementById("resetPasswordForm");
    this.newPassword = document.getElementById("new-password");
    this.confirmPassword = document.getElementById("confirm-password");

    this.init();
  }

  init() {
    // Initialize event listeners
    this.resetPasswordForm.addEventListener(
      "submit",
      this.handleResetPassword.bind(this)
    );
    this.newPassword.addEventListener(
      "input",
      this.validatePassword.bind(this)
    );
    this.confirmPassword.addEventListener(
      "input",
      this.validateConfirmPassword.bind(this)
    );
  }

  async handleResetPassword(event) {
    event.preventDefault();
    const formData = new FormData(this.resetPasswordForm);
    const data = Object.fromEntries(formData.entries());

    const newPassword = data["new-password"];
    const confirmPassword = data["confirm-password"];

    const isValid = this.validateConfirmPassword();

    if (!isValid) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    try {
      const result = await Password.resetPassword(id, newPassword);
      console.log(result);

        // showMessage(result.message, "success");
        window.location.href = "/login.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to reset password. Please try again.");
    }
  }

  validatePassword() {
    const newPassword = this.newPassword.value;
    const errorMessage = document.querySelector(".error-message.password");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      this.newPassword.style.borderColor = "red";
      errorMessage.textContent =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      //   errorMessage.style.color = "red";
      //   errorMessage.style.fontSize = "12px";
      //   errorMessage.style.marginTop = "5px";
      //   errorMessage.style.display = "block";
      //   errorMessage.style.backgroundColor = "#f8d7da";
      //   errorMessage.style.padding = "5px";
    } else {
      this.newPassword.style.borderColor = "";
      errorMessage.textContent = "";
    }
  }

  validateConfirmPassword() {
    const newPassword = this.newPassword.value;
    const confirmPassword = this.confirmPassword.value;
    const errorMessage = document.querySelector(".error-message.confirm-password");

    if (newPassword !== confirmPassword) {
      this.confirmPassword.style.borderColor = "red";
      errorMessage.textContent = "Passwords do not match.";
      return false;
    } else {
      this.confirmPassword.style.borderColor = "";
      errorMessage.textContent = "";
      return true;
    }
  }

}
