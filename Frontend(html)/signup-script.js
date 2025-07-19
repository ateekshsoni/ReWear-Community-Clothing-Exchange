// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) strength += 1;
  else feedback.push("At least 8 characters");

  // Uppercase check
  if (/[A-Z]/.test(password)) strength += 1;
  else feedback.push("One uppercase letter");

  // Lowercase check
  if (/[a-z]/.test(password)) strength += 1;
  else feedback.push("One lowercase letter");

  // Number check
  if (/\d/.test(password)) strength += 1;
  else feedback.push("One number");

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  else feedback.push("One special character");

  return { strength, feedback };
}

// Update password strength indicator
function updatePasswordStrength() {
  const password = document.getElementById("password").value;
  const strengthFill = document.getElementById("strengthFill");
  const strengthText = document.getElementById("strengthText");

  if (password.length === 0) {
    strengthFill.className = "strength-fill";
    strengthText.textContent = "Password strength";
    strengthText.className = "strength-text";
    return;
  }

  const { strength, feedback } = checkPasswordStrength(password);

  // Remove existing classes
  strengthFill.className = "strength-fill";
  strengthText.className = "strength-text";

  if (strength <= 2) {
    strengthFill.classList.add("weak");
    strengthText.classList.add("weak");
    strengthText.textContent = "Weak password";
  } else if (strength === 3) {
    strengthFill.classList.add("fair");
    strengthText.classList.add("fair");
    strengthText.textContent = "Fair password";
  } else if (strength === 4) {
    strengthFill.classList.add("good");
    strengthText.classList.add("good");
    strengthText.textContent = "Good password";
  } else {
    strengthFill.classList.add("strong");
    strengthText.classList.add("strong");
    strengthText.textContent = "Strong password";
  }
}

// Check password match
function checkPasswordMatch() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const matchIndicator = document.getElementById("passwordMatch");

  if (confirmPassword.length === 0) {
    matchIndicator.textContent = "";
    matchIndicator.className = "password-match";
    return;
  }

  if (password === confirmPassword) {
    matchIndicator.textContent = "✓ Passwords match";
    matchIndicator.className = "password-match match";
  } else {
    matchIndicator.textContent = "✗ Passwords do not match";
    matchIndicator.className = "password-match no-match";
  }
}

// Toggle password visibility
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const icon =
    fieldId === "password"
      ? document.getElementById("toggleIcon1")
      : document.getElementById("toggleIcon2");

  if (field.type === "password") {
    field.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    field.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation
function validateForm() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  let isValid = true;
  const errors = [];

  // Full name validation
  if (fullName.length < 2) {
    errors.push("Please enter your full name");
    isValid = false;
  }

  // Email validation
  if (!validateEmail(email)) {
    errors.push("Please enter a valid email address");
    isValid = false;
  }

  // Password validation
  const { strength } = checkPasswordStrength(password);
  if (strength < 3) {
    errors.push("Password is too weak");
    isValid = false;
  }

  // Password match validation
  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
    isValid = false;
  }

  // Terms validation
  if (!terms) {
    errors.push("Please accept the Terms & Conditions");
    isValid = false;
  }

  return { isValid, errors };
}

// Show success modal
function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("show");
}

// Close modal
function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("show");
  // Redirect to dashboard or login page
  window.location.href = "dashboard.html"; // You can change this to your desired page
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const { isValid, errors } = validateForm();

  if (!isValid) {
    alert("Please fix the following errors:\n" + errors.join("\n"));
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector(".signup-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Get form data
    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      newsletter: document.getElementById("newsletter").checked,
    };

    // Here you would typically send the data to your backend
    console.log("Form data:", formData);

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Show success modal
    showSuccessModal();
  }, 2000);
}

// Real-time validation
function setupRealTimeValidation() {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Full name validation
  fullNameInput.addEventListener("blur", function () {
    const wrapper = this.parentElement;
    if (this.value.trim().length < 2) {
      wrapper.classList.add("error");
      wrapper.classList.remove("success");
    } else {
      wrapper.classList.add("success");
      wrapper.classList.remove("error");
    }
  });

  // Email validation
  emailInput.addEventListener("blur", function () {
    const wrapper = this.parentElement;
    if (!validateEmail(this.value.trim())) {
      wrapper.classList.add("error");
      wrapper.classList.remove("success");
    } else {
      wrapper.classList.add("success");
      wrapper.classList.remove("error");
    }
  });

  // Password strength
  passwordInput.addEventListener("input", function () {
    updatePasswordStrength();
    if (confirmPasswordInput.value) {
      checkPasswordMatch();
    }
  });

  // Password match
  confirmPasswordInput.addEventListener("input", checkPasswordMatch);

  // Remove error states on focus
  [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
    (input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.remove("error");
      });
    }
  );
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Setup form submission
  const form = document.getElementById("signupForm");
  form.addEventListener("submit", handleFormSubmit);

  // Setup real-time validation
  setupRealTimeValidation();

  // Close modal when clicking outside
  const modal = document.getElementById("successModal");
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Social login handlers
  document
    .querySelector(".social-btn.google")
    .addEventListener("click", function () {
      // Handle Google signup
      console.log("Google signup clicked");
      alert("Google signup integration would go here");
    });

  document
    .querySelector(".social-btn.facebook")
    .addEventListener("click", function () {
      // Handle Facebook signup
      console.log("Facebook signup clicked");
      alert("Facebook signup integration would go here");
    });

  // Add smooth animations
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)";
    });
  });
});

// Utility function to simulate API calls
function simulateAPICall(endpoint, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success/failure
      if (Math.random() > 0.1) {
        // 90% success rate
        resolve({
          success: true,
          message: "Account created successfully",
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: data.fullName,
            email: data.email,
          },
        });
      } else {
        reject({
          success: false,
          message: "Email already exists",
        });
      }
    }, 1500 + Math.random() * 1000);
  });
}

// Enhanced form submission with better error handling
async function handleFormSubmitAdvanced(event) {
  event.preventDefault();

  const { isValid, errors } = validateForm();

  if (!isValid) {
    // Show errors in a more user-friendly way
    showFormErrors(errors);
    return;
  }

  const submitBtn = document.querySelector(".signup-btn");
  const originalText = submitBtn.innerHTML;

  try {
    // Show loading state
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      newsletter: document.getElementById("newsletter").checked,
    };

    // Make API call
    const response = await simulateAPICall("/api/signup", formData);

    // Success
    showSuccessModal();
  } catch (error) {
    // Handle errors
    alert("Error: " + error.message);
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Show form errors in a better way
function showFormErrors(errors) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-container";
  errorContainer.innerHTML = `
        <div class="error-message-box">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
                <h4>Please fix the following errors:</h4>
                <ul>
                    ${errors.map((error) => `<li>${error}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

  // Remove existing error container
  const existingError = document.querySelector(".error-container");
  if (existingError) {
    existingError.remove();
  }

  // Insert error container
  const form = document.getElementById("signupForm");
  form.insertBefore(errorContainer, form.firstChild);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

// Add CSS for error container dynamically
const errorStyles = `
    .error-container {
        margin-bottom: 20px;
        animation: slideDown 0.3s ease;
    }

    .error-message-box {
        background: #fdf2f2;
        border: 1px solid #e74c3c;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .error-message-box i {
        color: #e74c3c;
        font-size: 1.2rem;
        margin-top: 2px;
    }

    .error-message-box h4 {
        margin: 0 0 8px 0;
        color: #e74c3c;
        font-size: 0.95rem;
    }

    .error-message-box ul {
        margin: 0;
        padding-left: 16px;
        color: #c0392b;
    }

    .error-message-box li {
        font-size: 0.9rem;
        margin-bottom: 4px;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject error styles
const styleSheet = document.createElement("style");
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);
