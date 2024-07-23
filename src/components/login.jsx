import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const user = { username, password };

        axios.post('http://localhost/recipe-app/Back_end/users/login.php', user)
            .then(response => {
                if (response.data.success) {
                    login(response.data.user);
                    setMessage('Login successful!');
                    navigate('/');
                } else {
                    setMessage(`Error: ${response.data.error}`);
                }
            });
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
