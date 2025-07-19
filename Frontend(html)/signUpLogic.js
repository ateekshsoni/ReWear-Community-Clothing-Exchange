//singup form
let signUpForm = document.getElementById("signupForm");
let nameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let termsCheckbox = document.getElementById("terms");
if (signUpForm) {
  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    if (
      nameInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      passwordInput.value.trim() === "" ||
      confirmPasswordInput.value.trim() === ""
    ) {
      alert("Please fill in all fields.");
      console.error("All fields are required.");
      return;
    }
    let fullName = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let confirmPassword = confirmPasswordInput.value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      console.error("Passwords do not match.");
      return;
    }

    if (!termsCheckbox.checked) {
      alert("You must agree to the terms and conditions.");
      console.error("Terms and conditions not accepted.");
      return;
    }

    // If all validations pass, submit the form
    let formData = {
      name: fullName,
      email: email,
      password: password,
    };

    // Simulate form submission (e.g., send to server)
    axios
      .post("http://localhost:3001/api/auth/register", formData)
      .then((response) => {
        if (response.status === 201) {
          alert("Registration successful!");
          window.location.href = "login.html"; // Redirect to login page
          console.log("Registration successful:", response.data);
        }
      });
  });
}
