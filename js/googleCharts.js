google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let food = 0;
  let fastFood = 0;
  let travel = 0;
  let shopping = 0;
  let bills = 0;
  let other = 0;

  expenses.forEach(exp => {

    if (exp.category === "Food")
      food += Number(exp.amount);

    else if (exp.category === "Fast Food")
      fastFood += Number(exp.amount);

    else if (exp.category === "Travel")
      travel += Number(exp.amount);

    else if (exp.category === "Shopping")
      shopping += Number(exp.amount);

    else if (exp.category === "Bills")
      bills += Number(exp.amount);

    else
      other += Number(exp.amount);

  });

  // PIE CHART DATA
  const pieData = google.visualization.arrayToDataTable([
    ['Category', 'Amount'],
    ['Food', food],
    ['Fast Food', fastFood],
    ['Travel', travel],
    ['Shopping', shopping],
    ['Bills', bills],
    ['Other', other]
  ]);

  // PIE CHART OPTIONS
  const pieOptions = {
    title: 'Expense Analysis',
    pieHole: 0.5,
    chartArea: {
      width: '90%',
      height: '80%'
    },
    legend: {
      position: 'top',
      textStyle: {
        fontSize: 14
      }
    },
    colors: [
      '#ef4444',
      '#22c55e',
      '#3b82f6',
      '#f59e0b',
      '#8b5cf6',
      '#14b8a6'
    ]
  };

  const pieChart = new google.visualization.PieChart(
    document.getElementById('piechart')
  );

  pieChart.draw(pieData, pieOptions);


  // BAR CHART DATA
  const barData = google.visualization.arrayToDataTable([
    ['Category', 'Amount'],
    ['Food', food],
    ['Fast Food', fastFood],
    ['Travel', travel],
    ['Shopping', shopping],
    ['Bills', bills],
    ['Other', other]
  ]);

  const barOptions = {
    title: 'Expense Comparison',
    legend: { position: 'none' },
    chartArea: {
      width: '70%',
      height: '70%'
    },
    colors: ['#3b82f6']
  };

  const barChart = new google.visualization.ColumnChart(
    document.getElementById('barchart')
  );

  barChart.draw(barData, barOptions);

}