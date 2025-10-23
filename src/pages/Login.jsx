import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // optional eye icons

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // new state
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.id || user._id);

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          name="email"
          placeholder="College email"
          value={form.email}
          onChange={handle}
          className="w-full p-2 border rounded"
          required
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'} // toggle type
            placeholder="Password"
            value={form.password}
            onChange={handle}
            className="w-full p-2 border rounded"
            required
          />
          <span
            className="absolute right-2 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        
<p className="text-right text-sm mt-1">
  <a href="/forgot-password" className="text-blue-600 hover:underline">
    Forgot Password?
  </a>
</p>
   
       

        <button className="w-full bg-green-600 text-white p-2 rounded">Login</button>
        <button 
  onClick={() => window.location.href = '/register'}
  className="w-full bg-gray-600 text-white p-2 rounded"
>
  Create Account
</button>

      </form>
    </div>
  );
}
