// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the form element
    const signupForm = document.querySelector('#signup-form');

    // Handle the form submission
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the values from the form fields
        const username = document.querySelector('#signup-username').value.trim();
        const email = document.querySelector('#signup-email').value.trim();
        const password = document.querySelector('#signup-password').value.trim();
        const confirmPassword = document.querySelector('#signup-confirm-password').value.trim();

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Example payload to send to the server
        const payload = {
            username,
            email,
            password
        };

        try {
            // Send a POST request to the server for signup
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Handle the response from the server
            if (response.ok) {
                alert('Signup successful!');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                const data = await response.json();
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup. Please try again later.');
        }
    });

    // Handle Google Signup (This assumes you have a Google API script in your HTML)
    const googleSignUpButton = document.querySelector('#google-signup');
    googleSignUpButton.addEventListener('click', () => {
        // Your Google Sign-In logic here
        // Example: gapi.auth2.getAuthInstance().signIn().then(...);
    });
});

