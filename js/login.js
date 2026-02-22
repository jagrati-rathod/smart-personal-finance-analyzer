function loginUser() {

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()

  const usernamePattern = /^[a-zA-Z0-9_]{4,15}$/

  if (!usernamePattern.test(username)) {
    alert("Username must be 4-15 characters (letters, numbers, underscore only)")
    return false
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters")
    return false
  }

  alert("Login Successful ✅")
  window.location.href = "dashboard.html"
  return false
}


/* ===== FORGOT PASSWORD ===== */

function openForgot() {
  document.getElementById("forgotModal").style.display = "flex"
}

function closeForgot() {
  document.getElementById("forgotModal").style.display = "none"
}

function resetPassword() {

  const email = document.getElementById("resetEmail").value

  if (!email.includes("@")) {
    alert("Enter valid email address")
    return
  }

  alert("Reset link sent to your email 📩")
  closeForgot()
}


/* ===== SIGNUP (Demo Reset) ===== */

function signupUser(){
  alert("Signup Page Coming Soon 🚀")
}