function checkHealthAlert() {
  const health = document.getElementById("healthConcern").value;

  // demo: assume last added expense category
  const lastExpenseCategory = localStorage.getItem("expenseCategory");

  if (!health || !lastExpenseCategory) {
    alert("Please select health concern and add an expense first.");
    return;
  }

  if (health === "digestion" && lastExpenseCategory === "fastfood") {
    alert("⚠️ Alert: Fast food spending may worsen digestion problems.");
  } 
  else if (health === "diabetes" && lastExpenseCategory === "fastfood") {
    alert("⚠️ Alert: Junk food increases diabetes risk.");
  }
  else if (health === "heart" && lastExpenseCategory === "fastfood") {
    alert("⚠️ Alert: Fast food may affect heart health.");
  }
  else {
    alert("✅ No health risk detected. Good choice!");
  }
}