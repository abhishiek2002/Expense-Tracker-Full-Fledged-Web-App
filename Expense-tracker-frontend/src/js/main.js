import { load } from "@cashfreepayments/cashfree-js";
import validateUser from "../utils/validate.js";
import { getPaymentSessionId } from "../utils/paymentService.js";

// Simulated user authentication state
let cashfree;
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let user = [];

// DOM Elements
const navAuth = document.getElementById("nav-auth");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const contactForm = document.getElementById("contact-form");
const membershipSpan = document.getElementById("premium-membership");
const pricingBtn = document.querySelector(".pricing-btn.premium");

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
  await validate();

  // payment gateway sdk initialize
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  initializeSDK();

  initializeNavbar();
  initializeScrollAnimations();
  initializeMobileNav();
  initializePricing();
  initializeContactForm();
  initializeSmoothScrolling();
});

// validate user

async function validate() {
  try {
    const response = await validateUser();

    if (!response) {
      isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
    } else {
      user = response.data;
      isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

// Dynamic Navbar based on login status
function initializeNavbar() {
  if (isLoggedIn) {
    navAuth.innerHTML = `
            <button class="nav-btn logout-btn">Logout</button>
        `;

    // add star fot premium user
    if (user.membership === "Premium") {
      membershipSpan.style.display = "inline";
    }
  } else {
    navAuth.innerHTML = `
            <button class="nav-btn"><a href="login.html">Login</a></button>
            <button class="nav-btn primary"><a href="signup.html">Sign Up</a></button>
        `;
  }
}

navAuth.addEventListener("click", (e) => {
  if (e.target.classList.contains("logout-btn")) {
    logout();
  }
});

function logout() {
  // Simulate logout process
  localStorage.removeItem("token");
  isLoggedIn = false;
  localStorage.setItem("isLoggedIn", "false");
  initializeNavbar();
  showNotification("Successfully logged out!", "info");
}

// Mobile Navigation Toggle
function initializeMobileNav() {
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Scroll Reveal Animations using Intersection Observer
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation for grid items
        if (
          entry.target.classList.contains("services-grid") ||
          entry.target.classList.contains("pricing-grid")
        ) {
          const cards = entry.target.querySelectorAll(
            ".service-card, .pricing-card"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // Observe grid containers for staggered animations
  const gridContainers = document.querySelectorAll(
    ".services-grid, .pricing-grid"
  );
  gridContainers.forEach((container) => {
    observer.observe(container);
  });
}

// Pricing Section

function initializePricing() {
  if (user.membership === "Premium") {
    pricingBtn.style.cursor = "not-allowed";
  }
}

// Contact Form Handler
function initializeContactForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simulate form submission
    showLoadingState();

    

    setTimeout(() => {
      // Create mailto link (placeholder for email integration)
      const subject = encodeURIComponent(
        "Contact Form Submission from " + name
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      const mailtoLink = `mailto:kuntalabishek2002@gmail.com?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form and show success message
      contactForm.reset();
      hideLoadingState();
      showNotification(
        "Message sent successfully! Your email client should open.",
        "success"
      );
    }, 1500);
  });
}

// Loading state for contact form
function showLoadingState() {
  const submitBtn = contactForm.querySelector(".contact-btn");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
}

function hideLoadingState() {
  const submitBtn = contactForm.querySelector(".contact-btn");
  submitBtn.textContent = "Send Message";
  submitBtn.disabled = false;
  submitBtn.style.opacity = "1";
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// CTA Button Handler
document.querySelector(".cta-btn").addEventListener("click", function () {
  if (isLoggedIn) {
    // Redirect to expenses page (simulated)
    showNotification("Redirecting to expenses dashboard...", "info");
    setTimeout(() => {
      // In a real app, this would redirect to the expenses page
      window.location.href = "/expenses.html";
    }, 1000);
  } else {
    // Prompt to sign up
    showNotification(
      "Please sign up to access your expenses dashboard.",
      "warning"
    );
    document.querySelector("#nav-auth .primary").click();
  }
});

// Pricing buttons handlers
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("pricing-btn")) {
    const planType = e.target
      .closest(".pricing-card")
      .querySelector("h3").textContent;

    if (planType === "Free") {
      if (!isLoggedIn) {
        showNotification(
          "Please sign up to access your expenses dashboard.",
          "warning"
        );
        document.querySelector("#nav-auth .primary").click();
      } else {
        showNotification(
          "Welcome to ExpenseTracker Free! Sign up to get started.",
          "success"
        );
      }
    } else {
      if (!isLoggedIn) {
        showNotification(
          "Please sign up to access your expenses dashboard.",
          "warning"
        );
        document.querySelector("#nav-auth .primary").click();
      } else {
        // get paymentSessionId
        const orderAmount = 750;
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
    }
  }
});

// Notification System
function showNotification(message, type = "info") {
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
        background: ${getNotificationColor(type)};
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

function getNotificationColor(type) {
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

// Add notification animations to CSS
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add hover effects to service cards
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero-visual");

  if (hero && heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add floating animation variants
function addFloatingAnimations() {
  const expenseCard = document.querySelector(".expense-card");

  if (expenseCard) {
    // Add random delay to make animation more natural
    expenseCard.style.animationDelay = Math.random() * 2 + "s";

    // Add interaction on hover
    expenseCard.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    expenseCard.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
      this.style.transform = "";
    });
  }
}

// Initialize floating animations when DOM is loaded
document.addEventListener("DOMContentLoaded", addFloatingAnimations);

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }

  // Close notifications with Escape key
  if (e.key === "Escape") {
    const notification = document.querySelector(".notification");
    if (notification) {
      notification.remove();
    }
  }
});



