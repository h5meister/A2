import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Login successful!');
                window.location.href = '/home'; // 成功登录后跳转到主页
            } else {
                setErrorMessage('Login failed: ' + data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    // 定义内联样式
    const styles = {
        container: {
            backgroundColor: '#e5f3f3',
            border: '1px solid #ccc',
            padding: '20px',
            width: '300px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            margin: '20px auto',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#fff',
            backgroundColor: '#78a6c8',
            padding: '10px',
            borderRadius: '8px 8px 0 0',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'inline-block',
            width: '70px',
            textAlign: 'right',
            marginRight: '10px',
        },
        input: {
            width: '180px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            backgroundColor: '#78a6c8',
            color: '#fff',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            margin: '5px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
        },
        link: {
            color: '#007bff',
            margin: '0 10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="username">Username:</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="password">Password:</label>
                    <input
                        style={styles.input}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <div style={styles.error}>{errorMessage}</div>}
                <div style={{ textAlign: 'center' }}>
                    <button style={styles.button} type="submit">Login</button>
                </div>
            </form>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <a style={styles.link} href="/register.html">Sign Up</a>
                <a style={styles.link} href="/forgot_password.html">Forgot Password</a>
            </div>
        </div>
    );
};

export default Login;
