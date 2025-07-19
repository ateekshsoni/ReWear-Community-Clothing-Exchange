// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

// Form submission handler
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const loginBtn = document.querySelector(".login-btn");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Basic validation
  if (!email || !password) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Add loading state
  loginBtn.classList.add("loading");

  // Simulate API call
  setTimeout(() => {
    loginBtn.classList.remove("loading");
    showNotification("Login successful! Redirecting...", "success");

    // Simulate redirect after successful login
    setTimeout(() => {
      let formData = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:3001/api/auth/login", formData)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem("token", response.data.token);
            showNotification(
              "Login successful! Redirecting to dashboard...",
              "success"
            );
            window.location.href = "item-detail.html"; // Redirect to dashboard
          }
          if (response.status === 401) {
            showNotification("Invalid email or password", "error");
          }
        });
      // window.location.href = '/dashboard';
      console.log("Redirecting to dashboard...");
    }, 1500);
  }, 2000);
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
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
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add notification styles
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .notification.success {
            background: linear-gradient(135deg, #4a7c59 0%, #2d5a27 100%);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
        }
        
        .notification.info {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
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

  document.head.appendChild(style);
  document.body.appendChild(notification);

  // Auto remove notification
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  }, 4000);
}

// Social login handlers
document
  .querySelector(".social-btn.google")
  .addEventListener("click", function () {
    showNotification("Google login integration coming soon!", "info");
  });

document
  .querySelector(".social-btn.facebook")
  .addEventListener("click", function () {
    showNotification("Facebook login integration coming soon!", "info");
  });

// Input focus animations
document.querySelectorAll(".input-wrapper input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});

// Add focused state styles
const focusStyle = document.createElement("style");
focusStyle.textContent = `
    .input-wrapper.focused {
        transform: translateY(-2px);
    }
    
    .input-wrapper.focused i {
        color: #4a7c59;
    }
`;
document.head.appendChild(focusStyle);

// Keyboard navigation enhancement
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Enter" &&
    e.target.tagName !== "BUTTON" &&
    e.target.type !== "submit"
  ) {
    const form = e.target.closest("form");
    if (form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.click();
      }
    }
  }
});

// Remember me functionality
document.getElementById("remember").addEventListener("change", function () {
  if (this.checked) {
    localStorage.setItem("rememberMe", "true");
  } else {
    localStorage.removeItem("rememberMe");
  }
});

// Check if user should be remembered on page load
window.addEventListener("load", function () {
  const rememberMe = localStorage.getItem("rememberMe");
  if (rememberMe === "true") {
    document.getElementById("remember").checked = true;
    // You could also pre-fill the email if stored securely
  }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";

// Performance optimization - lazy load background animations
const brandSection = document.querySelector(".brand-section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});

observer.observe(brandSection);
