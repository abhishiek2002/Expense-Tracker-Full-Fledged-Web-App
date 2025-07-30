import userClassInstance from "../utils/userServices.js";
import validateUser from "../utils/validate.js";

// Login form validation and handling
class LoginValidator {
  constructor() {
    this.form = document.getElementById("loginForm");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.emailError = document.getElementById("emailError");
    this.passwordError = document.getElementById("passwordError");
    this.loginBtn = document.querySelector(".login-btn");
    this.btnText = document.querySelector(".btn-text");

    this.init();
  }

  async validateUserLogin() {
    try {
      const response = await validateUser();
      console.log(response);

      if (response) {
        window.location.href = "index.html";
      } else {
        // after validation , make body visible
        document.body.style.display = "flex";
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async init() {
    // first validate user , if it is already loggedIn
    await this.validateUserLogin();

    // handle submittion
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    // Real-time validation
    this.emailInput.addEventListener("input", this.validateEmail.bind(this));
    this.passwordInput.addEventListener(
      "input",
      this.validatePassword.bind(this)
    );

    // Clear errors on focus
    this.emailInput.addEventListener("focus", () => this.clearError("email"));
    this.passwordInput.addEventListener("focus", () =>
      this.clearError("password")
    );
  }

  validateEmail(showError = false) {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      if (showError) this.showError("email", "Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      if (showError)
        this.showError("email", "Please enter a valid email address");
      return false;
    }

    this.clearError("email");
    return true;
  }

  validatePassword(showError = false) {
    const password = this.passwordInput.value.trim();

    if (!password) {
      if (showError) this.showError("password", "Password is required");
      return false;
    }

    if (password.length < 6) {
      if (showError)
        this.showError("password", "Password must be at least 6 characters");
      return false;
    }

    this.clearError("password");
    return true;
  }

  showError(field, message) {
    const errorElement =
      field === "email" ? this.emailError : this.passwordError;
    const inputElement =
      field === "email" ? this.emailInput : this.passwordInput;
    const formGroup = inputElement.closest(".form-group");

    errorElement.textContent = message;
    errorElement.classList.add("show");
    formGroup.classList.add("error");

    // Add shake animation
    inputElement.style.animation = "shake 0.5s ease";
    setTimeout(() => {
      inputElement.style.animation = "";
    }, 500);
  }

  clearError(field) {
    const errorElement =
      field === "email" ? this.emailError : this.passwordError;
    const inputElement =
      field === "email" ? this.emailInput : this.passwordInput;
    const formGroup = inputElement.closest(".form-group");

    errorElement.classList.remove("show");
    formGroup.classList.remove("error");
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = this.validateEmail(true);
    const isPasswordValid = this.validatePassword(true);

    if (!isEmailValid || !isPasswordValid) {
      this.shakeForm();
      return;
    }

    // Show loading state
    this.loginBtn.classList.add("loading");

    // Simulate API call
    try {
      await this.simulateLogin();
      this.handleLoginSuccess();
    } catch (error) {
      if (error.response) this.handleLoginError(error.response.data.error);
      else this.handleLoginError(error.message);
    } finally {
      this.loginBtn.classList.remove("loading");
    }
  }

  async simulateLogin() {
    // get form values
    const email = this.emailInput.value.trim().toLowerCase();
    const password = this.passwordInput.value;

    try {
      const res = await userClassInstance.login({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  handleLoginSuccess() {
    // Show success feedback
    this.showSuccessMessage();

    // Redirect after a short delay
    setTimeout(() => {
      // You can change this to your actual dashboard/expenses page
      window.location.href = "index.html";
    }, 300);
  }

  handleLoginError(message) {
    // Show general error message
    this.showError("password", message);
    this.shakeForm();
  }

  showSuccessMessage() {
    this.btnText.textContent = "Success!";
    this.loginBtn.style.background =
      "linear-gradient(135deg, #10b981 0%, #059669 100%)";

    // Add checkmark animation
    setTimeout(() => {
      this.btnText.innerHTML = "✓ Redirecting...";
    }, 200);
  }

  shakeForm() {
    this.form.style.animation = "shake 0.5s ease";
    setTimeout(() => {
      this.form.style.animation = "";
    }, 500);
  }
}

// Password visibility toggle functionality
class PasswordToggle {
  constructor() {
    this.addToggleButton();
  }

  addToggleButton() {
    const passwordGroup = document
      .querySelector("#password")
      .closest(".form-group");
    const passwordInput = document.getElementById("password");

    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "password-toggle";
    toggleBtn.innerHTML = "👁️";
    toggleBtn.setAttribute("aria-label", "Toggle password visibility");

    // Add styles for toggle button
    const style = document.createElement("style");
    style.textContent = `
      .form-group {
        position: relative;
      }
      .password-toggle {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
        z-index: 1;
        margin-top: 12px;
      }
      .password-toggle:hover {
        opacity: 1;
      }
      .form-group input[type="password"],
      .form-group input[type="text"] {
        padding-right: 45px;
      }
    `;
    document.head.appendChild(style);

    passwordGroup.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      toggleBtn.innerHTML = type === "password" ? "👁️" : "🙈";
    });
  }
}

// Enhanced form interactions
class FormEnhancements {
  constructor() {
    this.addFloatingLabels();
    this.addProgressiveValidation();
    this.addKeyboardShortcuts();
  }

  addFloatingLabels() {
    const inputs = document.querySelectorAll(".form-group input");

    inputs.forEach((input) => {
      const updateLabel = () => {
        const label = input.previousElementSibling;
        if (input.value || input === document.activeElement) {
          label.style.transform = "translateY(-25px) scale(0.8)";
          label.style.color = "#667eea";
        } else {
          label.style.transform = "translateY(0) scale(1)";
          label.style.color = "#374151";
        }
      };

      input.addEventListener("focus", updateLabel);
      input.addEventListener("blur", updateLabel);
      input.addEventListener("input", updateLabel);

      // Initial state
      updateLabel();
    });
  }

  addProgressiveValidation() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Add success indicators
    const addSuccessIndicator = (input) => {
      let indicator = input.parentNode.querySelector(".success-indicator");
      if (!indicator) {
        indicator = document.createElement("span");
        indicator.className = "success-indicator";
        indicator.innerHTML = "✓";
        indicator.style.cssText = `
          position: absolute;
          right: 45px;
          top: 50%;
          transform: translateY(-50%);
          color: #10b981;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
          margin-top: 12px;
        `;
        input.parentNode.appendChild(indicator);
      }
      indicator.style.opacity = "1";
    };

    const removeSuccessIndicator = (input) => {
      const indicator = input.parentNode.querySelector(".success-indicator");
      if (indicator) {
        indicator.style.opacity = "0";
      }
    };

    emailInput.addEventListener("input", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        addSuccessIndicator(emailInput);
      } else {
        removeSuccessIndicator(emailInput);
      }
    });

    passwordInput.addEventListener("input", () => {
      if (passwordInput.value.trim().length >= 6) {
        addSuccessIndicator(passwordInput);
      } else {
        removeSuccessIndicator(passwordInput);
      }
    });
  }

  addKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Enter to submit form
      if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
        document.getElementById("loginForm").dispatchEvent(new Event("submit"));
      }
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LoginValidator();
  new PasswordToggle();
  new FormEnhancements();

  // Add welcome animation
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Add some extra visual polish -------------------------------------
// const addVisualEffects = () => {
//   // Particle background effect
//   const createParticle = () => {
//     const particle = document.createElement('div');
//     particle.className = 'particle';
//     particle.style.cssText = `
//       position: fixed;
//       width: 4px;
//       height: 4px;
//       background: rgba(255, 255, 255, 0.3);
//       border-radius: 50%;
//       pointer-events: none;
//       animation: float 6s linear infinite;
//       z-index: -1;
//     `;

//     particle.style.left = Math.random() * window.innerWidth + 'px';
//     particle.style.animationDelay = Math.random() * 6 + 's';

//     document.body.appendChild(particle);

//     setTimeout(() => {
//       particle.remove();
//     }, 6000);
//   };

//   // Add particle animation CSS
//   const particleStyle = document.createElement('style');
//   particleStyle.textContent = `
//     @keyframes float {
//       0% {
//         transform: translateY(100vh) rotate(0deg);
//         opacity: 0;
//       }
//       10% {
//         opacity: 1;
//       }
//       90% {
//         opacity: 1;
//       }
//       100% {
//         transform: translateY(-100px) rotate(360deg);
//         opacity: 0;
//       }
//     }
//   `;
//   document.head.appendChild(particleStyle);

//   // Create particles periodically
//   setInterval(createParticle, 2000);
// };

// Initialize visual effects ---------------------------------------
// setTimeout(addVisualEffects, 1000);
