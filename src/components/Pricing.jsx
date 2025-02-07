import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (plan === 'premium') {
      navigate('/premium-options'); // Navigate to PremiumOptions for premium plan
    } else if (plan === 'free') {
      alert("You have selected the Free Plan. Enjoy basic access to DEV@Deakin features!");
    }
  };

  return (
    <div className="pricing-plans">
      <h2>Choose Your Subscription Plan</h2>
      <div className="plan">
        <h3>Free Plan</h3>
        <p>Basic access to DEV@Deakin features</p>
        <button onClick={() => handleSelectPlan('free')}>Select Free Plan</button>
      </div>

      <div className="plan">
        <h3>Premium Plan</h3>
        <p>Access to customization, analytics, and support features</p>
        <button onClick={() => handleSelectPlan('premium')}>Select Premium Plan</button>
      </div>
    </div>
  );
};

export default Pricing;
