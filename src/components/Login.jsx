import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { auth, googleProvider } from '../firebase/firebase'; // Ensure googleProvider is properly set up
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Import necessary Firebase methods
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      navigate('/post'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); 
      navigate('/post'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      {error && <Message error>{error}</Message>}
      <Form onSubmit={handleLogin}>
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
        <Button type="submit" primary>
          Sign In
        </Button>
      </Form>
      <div className="google-signin">
        <Button color="google" onClick={handleGoogleLogin}>
          Sign In with Google
        </Button>
      </div>
      <p>
        Don't have an account? <a href="/sign-up">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
