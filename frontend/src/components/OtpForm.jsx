import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpForm.css'; // Import the CSS file

function OtpForm({ email }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    try {
      const response = await axios.post('http://localhost:5000/api/verify', { email, otp });

      if (response.data.success) {
        navigate('/welcome');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="otp-form-container">
      <h2 className="otp-form-heading">Verify OTP</h2>
      {error && <p className="otp-form-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="otp-form-label">Enter OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="otp-form-input"
        />
        <button type="submit" className="otp-form-button">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpForm;
