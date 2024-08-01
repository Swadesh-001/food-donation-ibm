// User data storage
const users = [
  { username: "donor1", password: "password1" },
  { username: "donor2", password: "password2" },
  { username: "donor3", password: "password3" },
  { username: "donor4", password: "password4" },
];

// Show Login Popup
window.showLoginPopup = function () {
  document.getElementById("login-popup").style.display = "flex";
};

// Show Register Popup
window.showRegisterPopup = function () {
  document.getElementById("login-popup").style.display = "none";
  document.getElementById("register-popup").style.display = "flex";
};

// Show Request Popup
window.showRequestPopup = function () {
  document.getElementById("request-popup").style.display = "flex";
};

// Close Popup
window.closePopup = function (popupId) {
  document.getElementById(popupId).style.display = "none";
};

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Check if user exists
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    sessionStorage.setItem("username", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password.");
  }
});

// Register Form Submission
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Check if username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      alert("Username already exists. Please choose a different one.");
    } else {
      // Add new user
      users.push({ username, password });
      alert("Registration successful. Please login.");
      closePopup("register-popup");
    }
  });

// Request Form Submission
document
  .getElementById("request-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const location = document.getElementById("request-location").value;

    // Submit the request (Here just close the popup)
    alert("Request submitted successfully.");
    closePopup("request-popup");
  });

// Fetch and display request count
fetch("requests.json")
  .then((response) => response.json())
  .then((data) => {
    const requestCountElement = document.getElementById("requests-count");
    requestCountElement.textContent = `Pending Requests: ${data.requests.length}`;
  });
