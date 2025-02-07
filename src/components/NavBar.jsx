import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; 
import './NavBar.css'; 

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Menu className="navbar" inverted fixed="top">
      <Menu.Item className="header" header>
        Dev@Deakin
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item as={Link} to="/" active={location.pathname === '/'} className="nav-item">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/find-questions" active={location.pathname === '/find-questions'} className="nav-item">
          Find Questions
        </Menu.Item>
        <Menu.Item as={Link} to="/post" active={location.pathname === '/post'} className="nav-item">
          Post
        </Menu.Item>
        <Menu.Item as={Link} to="/pricing" active={location.pathname === '/pricing'} className="nav-item">
          Plans
        </Menu.Item>

        {user ? (
          <Menu.Item className="nav-item" onClick={handleSignOut} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Login
          </Menu.Item>
        ) : (
          <Menu.Item className="nav-item" as={Link} to="/login" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Login
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
