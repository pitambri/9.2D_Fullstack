import React from 'react';
import './PremiumOptions.css';

const PremiumOptions = () => {
    const plans = [
        {
            name: 'Silver Plan',
            price: 99,
            url: 'https://buy.stripe.com/test_dR67vJdl08v07YI288',
            features: [
                "Gain access to premium content",
                "Attend monthly webinars led by industry professionals",
                "Access a simple analytics dashboard",
            ],
        },
        {
            name: 'Gold Plan',
            price: 149,
            url: 'https://buy.stripe.com/test_aEU03h6WCbHc7YIcMN',
            features: [
                "Includes basic plan benefits",
                "Get priority customer support",
                "Enhanced analytics dashboard",
                "Exclusive early access to upcoming features",
            ],
        },
        {
            name: 'Platinum Plan',
            price: 199,
            url: 'https://buy.stripe.com/test_9AQ9DR94K6mS1Ak146',
            features: [
                "Includes basic plan benefits",
                "One-on-one coaching sessions",
                "Assigned account manager for dedicated support",
                "Exclusive invitations to special events",
                "Customizable dashboard to suit your needs",
            ],
        },
    ];

    const handleSelectOption = (url) => {
        window.open(url, '_blank'); // Open payment link in a new tab
    };

    return (
        <div className="premium-options">
            <h2>Select Your Premium Plan</h2>
            {plans.map((plan, index) => (
                <div className="plan" key={index}>
                    <h3>{plan.name}</h3>
                    <p>Price: ${plan.price}/month</p>
                    <ul>
                        {plan.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                    <button onClick={() => handleSelectOption(plan.url)}>Select {plan.name}</button>
                </div>
            ))}
        </div>
    );
};

export default PremiumOptions;