import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import cart from "../../assets/image/cart.png";
import './index.css';

const AuthPage = () => {
    const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    password: ''
  });
  const [signinData, setSigninData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setSignupData({ ...signupData, [name]: value });
    } else {
      setSigninData({ ...signinData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = isRegistering 
      ? "https://fastcart-0i7b.onrender.com/api/auth/signup"
      : "https://fastcart-0i7b.onrender.com/api/auth/login";
  
    const payload = isRegistering ? signupData : signinData;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (!isRegistering) {
        Cookies.set("jwt_token", data.token, { expires: 7 });
        Cookies.set("user_id", data.user_id, { expires: 7 });
        Cookies.set("name", data.name, { expires: 7 });
        setIsTransitioning(true);
  
        setTimeout(() => {
        navigate('/');
        setIsTransitioning(false);
        }, 300); 
      }
  
      setErrorMsg(data.message);
  
      if (isRegistering) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsRegistering(false);
          setIsTransitioning(false);
        }, 300);
      }
  
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMsg(error.message);
    }
  };
  

  const toggleAuthMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setIsTransitioning(false);
    }, 300); 
  };

  return (
    <div className={`auth-container ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="auth-branding">
        <div className="brand-logo">
          <img src={cart} alt='Fast Cart Logo' className='logo' />
        </div>
        <h1>Welcome to <span className='logo-login'>Fast Cart</span></h1>
        <p>
          {isRegistering 
            ? "Create an account to start shopping" 
            : "Sign in to continue your shopping experience"}
        </p>
      </div>

      {/* Form Side */}
        <div className="auth-form-container">
            {isRegistering ? (
                <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <div className="input-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={signupData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={signupData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    </div>
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                <div className="auth-toggle">
                    <p>Already have an account?{' '}
                    <button type="button" onClick={toggleAuthMode} className="toggle-link">
                        Sign In
                    </button>
                    </p>
                </div>
                </form>
            ) : (
                <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={signinData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={signinData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    </div>
                </div>
                <button type="submit" className="submit-btn">Sign In</button>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                <div className="auth-toggle">
                    <p>Don't have an account?{' '}
                    <button type="button" onClick={toggleAuthMode} className="toggle-link">
                        Sign Up
                    </button>
                    </p>
                </div>
                </form>
            )}
        </div>

    </div>
  );
};

export default AuthPage;