import { useState } from 'react';
import Footer from '../components/Footer/Footer'; // Sahi relative path pages folder se
import PageOptions from '../components/PageOptions/PageOptions';
import './login.css';

const Login = () => {
  // State to toggle between 'Login' and 'Sign Up' layout smoothly
  const [state, setState] = useState("Login");

  // Form handling local states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (state === "Login") {
      console.log("Logging in user with:", formData.email);
      // Backend api hit handling goes here later
    } else {
      console.log("Registering user with:", formData.username, formData.email);
    }
  };

  return (
    <div className="login-page-container">
      <PageOptions />
      <div className="login-box-wrapper">
        
        {/* Dynamic Heading based on current view state */}
        <h2>{state}</h2>
        
        <form onSubmit={handleFormSubmit} className="login-fields-form">
          
          {/* Sign Up Mode check: Text Box Name field displays ONLY if state is 'Sign Up' */}
          {state === "Sign Up" ? (
            <div className="input-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={changeHandler} 
                placeholder="Enter your full name" 
                required 
              />
            </div>
          ) : null}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={changeHandler} 
              placeholder="name@example.com" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={changeHandler} 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn">Continue</button>
        </form>

        {/* Bottom Toggle links to swap states */}
        {state === "Sign Up" ? (
          <p className="login-toggle-text">
            Already have an account? <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="login-toggle-text">
            New to Kirti Crafts? <span onClick={() => setState("Sign Up")}>Create an account</span>
          </p>
        )}

        {/* Terms & Agreement text panel */}
        <div className="login-agree-checkbox">
          <input type="checkbox" id="agree" required />
          <label htmlFor="agree">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>

      </div>

      {/* Footer view alignment at the very bottom */}
      <Footer />
    </div>
  );
};

export default Login;