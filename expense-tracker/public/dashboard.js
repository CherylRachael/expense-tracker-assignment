// dashboard.js

// Sample data for demonstration; replace this with actual data
const expensesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: 'Expenses',
      data: [500, 700, 600, 400, 800, 900],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };
  
  // Configuration for the chart
  const config = {
    type: 'bar', // Type of chart (can be 'line', 'bar', 'pie', etc.)
    data: expensesData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  
  // Initialize the chart
  const expensesChart = new Chart(
    document.getElementById('expensesChart'),
    config
  );
  
  // Function to update the chart with new data
  function updateChart(newData) {
    expensesChart.data.datasets[0].data = newData;
    expensesChart.update();
  }
  
  // Example of updating the chart with new data when form is submitted
  document.getElementById('addExpenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Assuming you collect new data from the form (just a sample)
    const newExpense = parseFloat(document.getElementById('amount').value);
    
    // Update the chart (this is just an example, you'll need to handle the actual logic)
    expensesChart.data.datasets[0].data.push(newExpense);
    expensesChart.data.labels.push('New Month'); // Adjust this according to your data
    
    // Re-render the chart
    expensesChart.update();
  });

  const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;



// Fetch and update chart data dynamically (Example)
// Uncomment and adjust this section if you have a real API
/*
fetch('/api/expenses')
    .then(response => response.json())
    .then(data => {
        // Example data processing (Replace with actual logic)
        const amounts = data.map(expense => expense.amount);
        const labels = data.map(expense => expense.date);

        // Update chart data
        expensesChart.data.labels = labels;
        expensesChart.data.datasets[0].data = amounts;
        expensesChart.update();
    })
    .catch(error => console.error('Error fetching data:', error));
*/

