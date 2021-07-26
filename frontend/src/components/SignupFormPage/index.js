import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup-form-page'>
      {/* <div className='behind-nav'></div> */}
      <div className='signup-form-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className=''>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
          <div className='logo-holder'>
                <div ></div>
              </div>
              <div>
                <p>Sign up on Landscapr!</p>
              </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
          </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label>First Name</label>
          </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label>Last Name</label>
          </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Username</label>
          </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
          </div>
          <div className='signup-label'>
              <input
                className='signup-input'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Sign Up</label>
          </div>

            <button type="submit">Sign Up</button>
            <div >
            <p>Already Have an Account?
              <Link className='login-link' to='/login'>Log in here.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
