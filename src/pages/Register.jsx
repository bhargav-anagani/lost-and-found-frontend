import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await api.post('/auth/register', form);
      console.log('Registration successful:', res.data);

      // ✅ Show success message and redirect after short delay
      setMessage('✅ Account created successfully! Please log in to continue.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.msg || 'Error registering account');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Create an Account</h2>

      {/* ✅ Dynamic message styling */}
      {message && (
        <p
          className={`mb-3 text-center font-medium ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={submit} className="space-y-3">
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handle}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="College email"
          value={form.email}
          onChange={handle}
          className="w-full p-2 border rounded"
          required
        />

        {/* Password field with toggle */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handle}
            className="w-full p-2 border rounded"
            required
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm password field with toggle */}
        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handle}
            className="w-full p-2 border rounded"
            required
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-200"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
