import React, {useState, useEffect } from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../store/session';
import './SplashPage.css'


function SplashPage() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    const demoUser = {
      credential: "Demo-User",
      password: "password"
    }
    await dispatch(login(demoUser))
    history.push('./explore')
  }

  if (!sessionUser){
    return (
      <>
        <div className='splash-page-container'>

          <div className='splash-photo'>
            <form onSubmit={handleDemoLogin}>
              <button>demo user</button>
            </form>
          </div>
        </div>
      </>
    )
  }

    return (
      <Redirect to='/explore' />
    )



}

export default SplashPage;
