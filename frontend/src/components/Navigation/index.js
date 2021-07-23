import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import LoginFormModal from '../../context/LoginFormModal';// for MODAL
import UploadPhotoModal from '../../context/UploadPhotoModal';// for MODAL
import SignupFormModal from '../../context/SignupFormModal';// for MODAL
import './Navigation.css';
import './ProfileButton.css'
import ExplorePage from '../ExplorePage';
import UserHomePage from '../UserHomePage';

//images
// import cloud from "../public/images/cloud-upload.png"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <>
          <div className='explore-you-link'>
            <div>
              <NavLink className='navigation-link' to={`/${sessionUser.username}/${sessionUser.id}`}>You</NavLink>
              {/* <NavLink className='navigation-link' to={`/photos/${sessionUser.username}`}>You</NavLink> */}

            </div>
            <div>
              <NavLink className='navigation-link' to="/explore">Explore</NavLink>
            </div>
          </div>

          <div>
            {/* <UploadPhotoModal /> */}
            {/* <img src={require('./images/cloud-upload.jpg')}/> */}
            <NavLink className='navigation-link' to="/upload">
              <div className='upload-icon'></div>
            </NavLink>
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
        {/* <LoginFormModal /> */}
        <NavLink className='navigation-link' to='/explore'> Demo Login</NavLink>
        <NavLink className='navigation-link' to="/signup">Sign Up</NavLink>
        {/* <SignupFormModal /> */}
      </>
    );
  }

  return (
    <div className='navigation-container'>
        <NavLink className='navigation-link-home link' exact to="/">Landscapr</NavLink>

        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
