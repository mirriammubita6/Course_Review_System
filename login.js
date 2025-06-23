    const container = document.getElementById('container');
    document.getElementById('signUp').addEventListener('click', () => container.classList.add('right-panel-active'));
    document.getElementById('signIn').addEventListener('click', () => container.classList.remove('right-panel-active'));

    // Register Form Submit
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message || 'Registered successfully');
      if (res.ok) container.classList.remove('right-panel-active');
    });

    // Login Form Submit
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        const role = result.user.role;
        if (role === 'admin') location.href = '/admin-dashboard.html';
        else if (role === 'lecturer') location.href = '/lecturer-dashboard.html';
        else location.href = '/student-dashboard.html';
      } else {
        alert(result.message || 'Login failed');
      }
    });


    // redirecting 
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      // Redirect to dashboard based on role
      if (result.user.role === 'lecturer') {
        window.location.href = '/lecturer_dashboard.html';
      } else {
        window.location.href = '/student_dashboard.html';
      }
    } else {
      alert(result.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
});
