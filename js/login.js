function loginUser() {

  const username = document.querySelector("input[type='text']").value.trim()
  const password = document.querySelector("input[type='password']").value.trim()

  const storedUser = localStorage.getItem("username")
  const storedPass = localStorage.getItem("password")

  if (!username || !password) {
    alert("Please fill all fields")
    return false
  }

  if (username === storedUser && password === storedPass) {

    localStorage.setItem("isLoggedIn", "true")
    window.location.href = "dashboard.html"
  } 
  else {
    alert("Invalid Username or Password")
  }

  return false
}
function registerUser() {

  const username = document.getElementById("regUsername").value.trim()
  const password = document.getElementById("regPassword").value.trim()
  const confirmPassword = document.getElementById("confirmPassword").value.trim()

  if (!username || !password || !confirmPassword) {
    alert("Please fill all fields")
    return false
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters")
    return false
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return false
  }

  localStorage.setItem("username", username)
  localStorage.setItem("password", password)

  alert("Registration successful! Please login.")
  window.location.href = "login.html"

  return false
}