document.getElementById('updateProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const token = localStorage.getItem('token');

    const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('Profile updated successfully!');
    } else {
        alert('Failed to update profile.');
    }
});

// Handle settings form submission if needed
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Handle settings update logic here
    alert('Settings updated successfully!');
});
