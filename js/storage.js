function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpense(expense) {
  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function getBudget() {
  return Number(localStorage.getItem("budget")) || 0;
}

function saveBudget(budget) {
  localStorage.setItem("budget", budget);
}