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
              <NavLink className='navigation-link navlink' to={`/${sessionUser.username}/${sessionUser.id}`}>You</NavLink>
              {/* <NavLink className='navigation-link' to={`/photos/${sessionUser.username}`}>You</NavLink> */}
            </div>
            <div className='navigation-link explore'>
              <NavLink className='navigation-link navlink' to="/explore">Explore</NavLink>
            </div>
          </div>

          <div className='cloud-profile-section'>
            {/* <UploadPhotoModal /> */}
            {/* <img src={require('./images/cloud-upload.jpg')}/> */}
            <NavLink className='navigation-link' to="/upload">
              <div className='upload-icon'></div>
            </NavLink>
            <div>
                <ProfileButton user={sessionUser} />
            </div>
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
        <NavLink className='navigation-link' to="/signup">Sign Up</NavLink>
        {/* <SignupFormModal /> */}
      </>
    );
  }

  return (
    <div className='navigation-container'>
      <div className='logo-home'>
        <div className='lanscapr-logo'></div>
        <NavLink className='navigation-link-home link' exact to="/">Landscapr</NavLink>
      </div>
        {isLoaded && sessionLinks}

    </div>
  );
}

export default Navigation;
