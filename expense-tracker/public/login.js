// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the form element
    const loginForm = document.querySelector('#login-form');

    // Handle the form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the values from the form fields
        const email = document.querySelector('#login-email').value.trim();
        const password = document.querySelector('#login-password').value.trim();

        // Basic validation
        if (!email || !password) {
            alert('Please fill in both fields!');
            return;
        }

        // Example payload to send to the server
        const payload = {
            email,
            password
        };

        try {
            // Send a POST request to the server for login
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Handle the response from the server
            if (response.ok) {
                alert('Login successful!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard or homepage
            } else {
                const data = await response.json();
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    });

    // Handle Google Login (This assumes you have a Google API script in your HTML)
    const googleLoginButton = document.querySelector('#google-login');
    googleLoginButton.addEventListener('click', () => {
        // Your Google Sign-In logic here
        // Example: gapi.auth2.getAuthInstance().signIn().then(...);
    });
});
