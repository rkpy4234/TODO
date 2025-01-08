document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('loadingMessage').style.display = 'block';
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            fetch('https://script.google.com/macros/s/AKfycbzixI8ilVdMl_NWnSs6dk-LDhkAgFrgxIxkuU3oQY8Ftfxlu2stGc2e290u7H50U5jm/exec', {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify({ username: username, password: password })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('loadingMessage').style.display = 'none';

                    if (data.success) {
                        if (data.role === 'admin') {
                            window.location.href = `admin/admin.html?fullname=${data.fullname}&username=${username}`;
                        } else {
                            window.location.href = `users/users.html?fullname=${data.fullname}&username=${username}`;
                        }
                    } else {
                        document.getElementById('errorMessage').textContent = 'Invalid username or password!';
                    }
                })
                .catch(error => {
                    document.getElementById('loadingMessage').style.display = 'none';
                    console.error('Error:', error);
                    document.getElementById('errorMessage').textContent = 'An error occurred. Please try again later.';
                });
        });

