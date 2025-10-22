import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (isSending) {
      setMessage('Reset link already sent. Please check your email.');
      return;
    }

    setIsSending(true);
    setMessage('Sending reset link...');

    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage('Reset link sent successfully. Please check your email.');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error sending reset link');
      setIsSending(false); // allow retry if error
    }
  };

  // Re-enable button after 30 seconds
  useEffect(() => {
    let timeout;
    if (isSending) {
      timeout = setTimeout(() => {
        setIsSending(false);
      }, 30000); // 30 seconds
    }
    return () => clearTimeout(timeout);
  }, [isSending]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          placeholder="Enter your college email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
          disabled={isSending}
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
          disabled={isSending}
        >
          {isSending ? 'Link Sent' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}
