/* ================= STORAGE UTILITIES ================= */

/* ===== EXPENSE FUNCTIONS ===== */

function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpense(expense) {
  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function clearExpenses() {
  localStorage.removeItem("expenses");
}


/* ===== BUDGET FUNCTIONS ===== */

function getBudget() {
  return Number(localStorage.getItem("budget")) || 0;
}

function saveBudget(budget) {
  localStorage.setItem("budget", Number(budget));
}

function clearBudget() {
  localStorage.removeItem("budget");
}


/* ===== CALCULATION HELPERS ===== */

function calculateTotalSpent() {
  const expenses = getExpenses();
  let total = 0;

  expenses.forEach(exp => {
    total += Number(exp.amount);
  });

  return total;
}


/* ===== DISCIPLINE SCORE SYSTEM ===== */

function calculateDisciplineScore() {

  const budget = getBudget();
  const total = calculateTotalSpent();

  if (budget === 0) return 0;

  const percent = (total / budget) * 100;

  if (percent <= 80) {
    return 100;   // Excellent Discipline
  } 
  else if (percent <= 100) {
    return 70;    // Moderate Discipline
  } 
  else {
    return 40;    // Overspending
  }
}


/* ===== HEALTH TRACKER HELPER ===== */

function getCategoryTotal(categoryName) {

  const expenses = getExpenses();
  let total = 0;

  expenses.forEach(exp => {
    if (exp.category === categoryName) {
      total += Number(exp.amount);
    }
  });

  return total;
}


/* ===== INVESTMENT INSIGHT HELPER ===== */

function getInvestmentInsight() {

  const budget = getBudget();
  const total = calculateTotalSpent();

  if (budget === 0) {
    return "Set a budget to unlock smart insights.";
  }

  if (total > budget) {
    return "⚠ Overspending detected! Consider investing ₹1000/month in SIP instead of unnecessary expenses.";
  } 
  else {
    return "💡 Great discipline! You can invest your savings in Mutual Funds or Index Funds.";
  }
}