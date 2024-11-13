import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import OtpForm from './components/OtpForm';
import Welcome from './components/Welcome';

function App() {
  const [email, setEmail] = useState('');

  const handleOtpSent = (email) => {
    setEmail(email); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailForm onOtpSent={handleOtpSent} />} />
        <Route path="/otp" element={<OtpForm email={email} />} />
        <Route path="/welcome" element={<Welcome/>} />
      </Routes>
    </Router>
  );
}

export default App;
