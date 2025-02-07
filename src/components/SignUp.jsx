import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { auth, googleProvider } from '../firebase/firebase'; // Ensure googleProvider is exported from firebase setup
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Import Firebase Auth methods
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password); 
      navigate('/post'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider); 
      navigate('/post'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <Message error>{error}</Message>}
      <Form onSubmit={handleSignUp}>
        <Form.Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" primary>
          Sign Up
        </Button>
      </Form>

      <div className="google-signup">
        <Button color="google" onClick={handleGoogleSignUp}>
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
