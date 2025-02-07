import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FindQuestionsPage from './components/FindQuestionsPage';
import NewPostPage from './components/NewPostPage';
import Pricing from './components/Pricing';
import PaymentPage from './components/PaymentPage';
import PremiumOptions from './components/PremiumOptions';
import Login from './components/Login'; 
import SignUp from './components/SignUp'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-questions" element={<FindQuestionsPage />} />
        <Route path="/post" element={<NewPostPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/premium-options" element={<PremiumOptions />} />
        
        {/* Add login and sign-up routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
