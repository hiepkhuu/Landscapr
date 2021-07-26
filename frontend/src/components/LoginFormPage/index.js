import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/profile" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div clasName='login-form-page'>

      <div className='login-form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
              <div className=''>
                <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
              </div>
              <div className='logo-holder'>
                <div ></div>
              </div>
              <div>
                <p>Log in to Flickr.</p>
              </div>
              <div className='login-label'>

                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder='email'
                    id='email'
                  />
                  <label for='email'>Email Address </label>

              </div>
              <div className='login-label'>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='password'
                    id='password'
                  />
                  <label for='password'>password </label>

              </div>
          <button type="submit">Sign In</button>
          <div >
            <p>Not a Flicker memeber?
              <Link className='signup-link' to='/signup'>Sign up here.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
