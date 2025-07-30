import userClassInstance from "../utils/userServices.js";
import validateUser from "../utils/validate.js";

// Signup form validation and functionality
class SignupValidator {
  constructor() {
    this.form = document.getElementById("signupForm");
    this.requestError = document.getElementById("requestError");
    this.successMessage = document.getElementById("successMessage");
    this.init();
  }

  async init() {
    // first validate user , if it is already loggedIn
    await this.validateUserLogin();

    // Add event listeners
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    // Add real-time validation
    const inputs = this.form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });

    // Add fade-in animation to body element
    document.body.style.opacity = "0";
    window.addEventListener("load", () => {
      document.body.style.transition = "opacity 0.5s ease-in";
      document.body.style.opacity = "1";
    });
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

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    const isValid = this.validateAllFields(data);

    try {
      if (isValid) {
        this.showLoadingState();

        const res = await userClassInstance.signup(data);
        if (res.data.success) {
          this.showSuccess();
          setTimeout(() => {
            window.location.assign = "login.html";
          }, 300);
        }
      } else throw Error("Invalid data");
    } catch (error) {
      if (error.response) this.showRequestError(error.response.data.error);
      else this.showRequestError(error.message);
    }
  }

  validateAllFields(data) {
    let isValid = true;

    // Validate name
    if (!this.validateName(data.name)) {
      isValid = false;
    }

    // Validate email
    if (!this.validateEmail(data.email)) {
      isValid = false;
    }

    // Validate phone
    if (!this.validatePhone(data.phone)) {
      isValid = false;
    }

    // Validate password
    if (!this.validatePassword(data.password)) {
      isValid = false;
    }

    // Validate confirm password
    if (!this.validateConfirmPassword(data.password, data.confirmPassword)) {
      isValid = false;
    }

    return isValid;
  }

  validateField(input) {
    const value = input.value.trim();
    const name = input.name;

    switch (name) {
      case "name":
        return this.validateName(value);
      case "email":
        return this.validateEmail(value);
      case "phone":
        return this.validatePhone(value);
      case "password":
        return this.validatePassword(value);
      case "confirmPassword":
        const password = document.getElementById("password").value;
        return this.validateConfirmPassword(password, value);
      default:
        return true;
    }
  }

  validateName(name) {
    const nameInput = document.getElementById("name");
    const errorElement = document.getElementById("nameError");

    if (!name) {
      this.showError(nameInput, errorElement, "Full name is required");
      return false;
    }

    if (name.length < 2) {
      this.showError(
        nameInput,
        errorElement,
        "Name must be at least 2 characters"
      );
      return false;
    }

    this.clearError(nameInput);
    return true;
  }

  validateEmail(email) {
    const emailInput = document.getElementById("email");
    const errorElement = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.showError(emailInput, errorElement, "Email address is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      this.showError(
        emailInput,
        errorElement,
        "Please enter a valid email address"
      );
      return false;
    }

    this.clearError(emailInput);
    return true;
  }

  validatePhone(phone) {
    const phoneInput = document.getElementById("phone");
    const errorElement = document.getElementById("phoneError");
    const phoneRegex = /^\d{10}$/;

    if (!phone) {
      this.showError(phoneInput, errorElement, "Phone number is required");
      return false;
    }

    // Remove any non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "");

    if (!phoneRegex.test(digitsOnly)) {
      this.showError(
        phoneInput,
        errorElement,
        "Phone number must be exactly 10 digits"
      );
      return false;
    }

    this.clearError(phoneInput);
    return true;
  }

  validatePassword(password) {
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("passwordError");

    if (!password) {
      this.showError(passwordInput, errorElement, "Password is required");
      return false;
    }

    if (password.length < 6) {
      this.showError(
        passwordInput,
        errorElement,
        "Password must be at least 6 characters"
      );
      return false;
    }

    this.clearError(passwordInput);
    return true;
  }

  validateConfirmPassword(password, confirmPassword) {
    const confirmInput = document.getElementById("confirmPassword");
    const errorElement = document.getElementById("confirmPasswordError");

    if (!confirmPassword) {
      this.showError(
        confirmInput,
        errorElement,
        "Please confirm your password"
      );
      return false;
    }

    if (password !== confirmPassword) {
      this.showError(confirmInput, errorElement, "Passwords do not match");
      return false;
    }

    this.clearError(confirmInput);
    return true;
  }

  showError(input, errorElement, message) {
    input.style.borderColor = "#ef4444";
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  showRequestError(message) {
    this.requestError.textContent = `❌ ${message}`;
    this.requestError.style.color = "red";
  }

  clearError(input) {
    const errorElement = input.parentElement.querySelector(".error-message");
    input.style.borderColor = "#d1d5db";
    errorElement.classList.remove("show");

    // Clear error message after animation
    setTimeout(() => {
      if (!errorElement.classList.contains("show")) {
        errorElement.textContent = "";
      }
    }, 300);
  }

  clearRequestError(message) {
    this.requestError.textContent = ``;
  }

  showLoadingState() {
    const submitBtn = this.form.querySelector(".signup-btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  }

  showSuccess() {
    // Hide form and show success message
    this.form.style.display = "none";
    document.querySelector(".footer").style.display = "none";
    this.successMessage.classList.add("show");

    // Redirect to homepage after 3 seconds
    setTimeout(() => {
      document.location.href = "login.html";

      // For demo purposes, show a message
      const successP = this.successMessage.querySelector("p");
      successP.textContent = "Redirecting to your dashboard...";
    }, 2000);
  }
}

// Phone number formatting
// function formatPhoneNumber(input) {
//   // Remove all non-digit characters
//   let value = input.value.replace(/\D/g, '');

//   // Limit to 10 digits
//   value = value.substring(0, 10);

//   // Format as (XXX) XXX-XXXX
//   if (value.length > 6) {
//     value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
//   } else if (value.length > 3) {
//     value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
//   }

//   input.value = value;
// }

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SignupValidator();

  // Add phone number formatting

  // Prevent non-numeric input on phone field
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("keypress", (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char) && e.keyCode !== 8) {
      e.preventDefault();
    }
  });
});

// Add some interactive effects
// document.addEventListener('DOMContentLoaded', () => {
//   // Add floating label effect
//   const inputs = document.querySelectorAll('input');
//   inputs.forEach(input => {
//     input.addEventListener('focus', (e) => {
//       e.target.parentElement.classList.add('focused');
//     });

//     input.addEventListener('blur', (e) => {
//       if (!e.target.value) {
//         e.target.parentElement.classList.remove('focused');
//       }
//     });
//   });

//   // Add ripple effect to button
//   const button = document.querySelector('.signup-btn');
//   button.addEventListener('click', function(e) {
//     const ripple = document.createElement('span');
//     const rect = this.getBoundingClientRect();
//     const size = Math.max(rect.width, rect.height);
//     const x = e.clientX - rect.left - size / 2;
//     const y = e.clientY - rect.top - size / 2;

//     ripple.style.width = ripple.style.height = size + 'px';
//     ripple.style.left = x + 'px';
//     ripple.style.top = y + 'px';
//     ripple.classList.add('ripple');

//     this.appendChild(ripple);

//     setTimeout(() => {
//       ripple.remove();
//     }, 600);
//   });
// });
