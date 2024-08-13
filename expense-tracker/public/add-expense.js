document.getElementById('addExpenseForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const token = localStorage.getItem('token');

    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, category, date, description })
    });

    if (response.ok) {
        alert('Expense added successfully!');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard or another page
    } else {
        alert('Failed to add expense.');
    }
});
