import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EmailForm.css'; // Import the CSS file

const EmailForm = ({ onOtpSent }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/send", { email });

      if (response.status === 200) {
        onOtpSent(email); // Callback to inform parent about successful OTP sent
        navigate('/otp'); // Navigate to OTP verification page
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError('Error sending OTP. Please try again.');
    }
  };

  return (
    <div className="email-form-container">
      <h2 className="email-form-heading">AUTHENTICATION</h2>
      {error && <p className="email-form-error">{error}</p>}
      <form onSubmit={handleEmailSubmit}>
        <label className="email-form-label">Email-ID:</label>
        <input
          type="email"
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          required
          className="email-form-input"
        />
        <button type="submit" className="email-form-button">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
