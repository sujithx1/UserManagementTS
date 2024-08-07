document.getElementById('login-form')!.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const messageDiv = document.getElementById('message') as HTMLDivElement;

    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(email);

    messageDiv.classList.remove('error');
    messageDiv.textContent = '';

    // Frontend validation
    if (!email || !password) {
        messageDiv.classList.add('error');
        messageDiv.textContent = 'All fields are required.';
        return;
    }

    try {
        const response = await fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/admin/dashboard';
        } else {
            messageDiv.classList.add('error');
            messageDiv.textContent = data.msg || 'Login failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.classList.add('error');
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
});
