import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import baseTheme from "./themes";
import HomePage from "./pages/homePage";
import SignUpPage from "./pages/signupPage/SignUpPage";
import SignInPage from "./pages/signinPage";
import NewPostPage from "./pages/newPostPage";
import AccountPage from "./pages/accountPage";
import UserDashboard from "./pages/userDashboard";
import Header from "./components/atoms/Header";
import Menu from "./components/atoms/Menu";
import IPrice from "./pages/iPricePage";
import { getCurrentUser } from "../src/redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/reducers/authSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={baseTheme}>
      <Router>
        <CssBaseline />
        {user && <Header />}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {user && (
            <Route path="/newpost">
              <NewPostPage />
            </Route>
          )}
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>

          {user && (
            <Route path="/account/:id">
              <AccountPage />
            </Route>
          )}
          {user && (
            <Route path="/iprice">
              <IPrice />
            </Route>
          )}
          {user && user.user.RoleId === 1 && (
            <Route path="/admin/users">
              <UserDashboard />
            </Route>
          )}
        </Switch>
        {user && <Menu />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
