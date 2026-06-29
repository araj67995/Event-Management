const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

function showLogin() {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
}

function showSignup() {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
}

loginBtn.addEventListener("click", showLogin);
signupBtn.addEventListener("click", showSignup);


if (window.activeTab === "signup") {
  showSignup();
} else {
  showLogin();
}
