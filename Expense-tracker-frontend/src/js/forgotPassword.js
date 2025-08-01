import Password from "../utils/passwordService.js";

class ForgotPassword {
  constructor() {
    this.mainContainer = document.querySelector(".main-content");
    this.form = document.getElementById("forgot-password-form");
    this.emailInput = document.getElementById("email");
    this.submitButton = document.getElementById("submit-btn");
    this.errorMessage = document.getElementById("error-message");
    this.init();
  }
  async init() {
    // console.log(this.emailInput, this.form, this.submitButton, this.errorMessage, this.mainContainer);

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value.trim();

    if (!email) {
      this.showError("Email is required");
      return;
    }

    this.showloadingState();

    try {
      const response = await Password.forgotPassword(email);
      console.log(response);

      if (response) {
        this.clearError();
        this.showMessage("Reset link sent to your email", "success");
        window.location.href = "login.html";
      }
    } catch (error) {
      this.showMessage(
        error?.message || "Failed to send reset link",
        "error",
        "error"
      );
      this.showError(error?.message || "Failed to send reset link");
    } finally {
      this.hideLoadingState();
    }
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = "flex";
  }

  clearError() {
    this.errorMessage.textContent = "";
    this.errorMessage.style.display = "none";
  }

  showMessage(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${this.getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add button styles
    const button = notification.querySelector("button");
    button.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  getNotificationColor(type) {
    switch (type) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  }

  showloadingState() {
    this.submitButton.disabled = true;
    this.submitButton.textContent = "Sending...";
  }

  hideLoadingState() {
    this.submitButton.disabled = false;
    this.submitButton.textContent = "Send Reset Link";
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  new ForgotPassword();
});
