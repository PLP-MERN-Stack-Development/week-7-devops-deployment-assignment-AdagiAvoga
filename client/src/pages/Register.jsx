import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">

                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-fullborder p-2 rounded"
                required/>

                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-fullborder p-2 rounded"
                required/>

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-fullborder p-2 rounded"
                required/>
                <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
                    Register
                    </button>
                </form>
                </div>
    );
};

export default Register;