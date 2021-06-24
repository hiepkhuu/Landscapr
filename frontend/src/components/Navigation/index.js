import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import './Navigation.css';
import ExplorePage from '../ExplorePage';
import UserHomePage from '../UserHomePage';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <>
          <div>
            <NavLink to="/explore">Explore</NavLink>
          </div>
          <div>
            <button>Up Load</button>
          </div>
          <div>
            <ProfileButton user={sessionUser} />
          </div>
      </>
    );
    <UserHomePage />


  } else {
    sessionLinks = (
      <>
        {/* <LoginFormPage /> */}

        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navigation-container'>
        <NavLink exact to="/">Campr!🚙</NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
