window.ChartsAPI = {
  pieChart: null,
  barChart: null,

  // Helper to generate distinct colors
  getColors(count) {
    const defaultColors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];
    while (defaultColors.length < count) {
      defaultColors.push('#' + Math.floor(Math.random()*16777215).toString(16));
    }
    return defaultColors.slice(0, count);
  },

  renderPieChart(ctxId, labels, values) {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: this.getColors(labels.length),
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#94a3b8', font: { family: 'Poppins' } } }
        },
        cutout: '70%'
      }
    });
  },

  renderBarChart(ctxId, labels, values) {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;

    if (this.barChart) {
      this.barChart.destroy();
    }

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses',
          data: values,
          backgroundColor: '#4f46e5',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'Poppins' } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { family: 'Poppins' } }
          }
        }
      }
    });
  }
};
