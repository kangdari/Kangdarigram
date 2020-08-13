import React from "react";
import GlobalStyle from "./GlobalStyle";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import WirtePostPage from "./components/pages/WritePostPage/WirtePostPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import ProfileSavedPage from "./components/pages/ProfilePage/ProfileSavedPage";
import TagListPage from "./components/pages/TagListPage/TagListPage";
import ProfileEditPage from "./components/pages/ProfileEditPage/ProfileEditPage";

import Auth from "./hoc/auth";

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Switch>
        <Route path="/" component={Auth(HomePage, true)} exact />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
        <Route path="/write" component={Auth(WirtePostPage, true)} />
        <Route path="/:userId" component={Auth(ProfilePage, true)} exact />
        <Route path="/:userId/saved" component={Auth(ProfileSavedPage, true)} />
        <Route path="/explore/tags/:tag" component={Auth(TagListPage, null)} />
        <Route path="/profile/edit" component={Auth(ProfileEditPage, true)} />
      </Switch>
    </>
  );
}

export default App;
