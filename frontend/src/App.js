import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ExplorePage from "./components/ExplorePage"
import UserHomePage from "./components/UserHomePage";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/profile">
            <UserHomePage />
          </Route>
          <Route path="/upload">
            <UpLoad />
          </Route>
          <Route path='/explore'>
            <ExplorePage />
          </Route>
          <Route path={`/photos/:id`}>
            <PhotoDetail />
          </Route>
        </Switch>
      )}
      {/* <ExplorePage /> */}
    </>
  );
}

export default App;
