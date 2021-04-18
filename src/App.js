import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import facade from "./apiFacade";
import LoginForm from "./loginForm";
import Adminpage from "./Adminpage";
import ProfilePage from "./ProfilePage";
import FrontPage from "./FrontPage";
import { Row, Col, Container } from "react-bootstrap";
function App() {
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  /*   const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }; */
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.then((err) => {
          setErrorMes(err.message);
        });
      });
  };

  const setLoginStatus = (status) => {
    setLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Container fluid>
        <Row className="">
          <Col className="m-5 d-flex justify-content-center">
            <Switch>
              <Route exact path="/">
                {/*  <Home /> */}
                {loggedIn && (
                  <>
                    {history.push("/frontpage")}
                    {/* <Redirect to="/frontpage"/> */}
                  </>
                )}
                {!loggedIn && (
                  <LoginForm
                    errorMes={errorMes}
                    setErrorMes={setErrorMes}
                    login={login}
                  />
                )}
                {/* {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            //TODO: sørg for at man kan logge ud på en anden måde
            <div>
              <Redirect to="/frontpage" />
              
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )} */}
              </Route>
              <Route path="/page1">
                {/* Change */}
                <FetchDefault />
              </Route>
              <Route path="/frontpage">
                <FrontPage />
              </Route>
              <Route path="/page3">
                {/* <User /> */}
                <ProfilePage />
              </Route>
              <Route path="/page4">
                {/* <Admin /> */}
                <Adminpage />
              </Route>
              <Route path="/logout">
                <Login
                  loggedIn={loggedIn}
                  loginMsg={loggedIn ? "Logout" : "Login"}
                  setLoginStatus={setLoginStatus}
                />
              </Route>
              {/* <Route path="/login">
          
        </Route> */}
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// Remove
function FetchDefault() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    facade.fetchDefault(setArray);
  }, []);

  return (
    <div>
      <h3>Data fetched from api:</h3>
      <ul>
        {array.map((data) => {
          return <li>{data}</li>;
        })}
      </ul>
    </div>
  );
}

/* function FrontPage() {

  useEffect(() => {
   
  }, []);
  
  return (
    <div>
      <h1>TODO: posts frontpage</h1>
    </div>
  );
} */

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header">
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/frontpage">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/page3">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Adminpage
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      )}
      {!loggedIn && (
        <li>
          <NavLink exact activeClassName="active" to="/">
            {/* {loginMsg} */}
            <Redirect to="/" />
            Login page
          </NavLink>
        </li>
      )}
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

// Can be deleted, moved to Adminpage

export default App;
