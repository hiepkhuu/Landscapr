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
            <NavLink className='navigation-link' to="/explore">Explore</NavLink>
          </div>
          <div>
            <NavLink className='navigation-link' to={`/${sessionUser.username}/${sessionUser.id}`}>You</NavLink>
          </div>
          <div>
            <NavLink className='navigation-link' to="/upload">Up Load</NavLink>
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

        <NavLink className='navigation-link' to="/login">Log In</NavLink>
        <NavLink className='navigation-link' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navigation-container'>
        <NavLink className='navigation-link-home' exact to="/">Campr!🚙</NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
