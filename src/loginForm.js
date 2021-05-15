import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Recaptcha from 'react-recaptcha'
import facade from "./apiFacade";

function LogInForm({setLoggedIn,setErrorMes,login}) {
  const init = { username: "", password: ""};
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [token,setToken]=useState("");
  const [verify, setVerify] = useState(false);
  let recaptchaInstance;
  let token1;

  
  const performLogin = (evt) => {
    evt.preventDefault();
    if(verify){
      login(loginCredentials.username, loginCredentials.password, token)
    }else{
      console.log("Verify humanity");
    }
    
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  const resetRecaptcha = () => {
    recaptchaInstance.reset();  
  };
  const verifyCallback = (response) => {
    if(response){
      token1=response;
      setToken(response);
    
      console.log(token1);
      setVerify(true);
      
    }
  };
  return (
    <div>
      <div align="center">
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title className="text-center">
            Welcome to our website!
          </Card.Title>
          <Card.Text className="text-center">Login to continue</Card.Text>
          <Form onChange={onChange}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="User Name" id="username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
              />
            </Form.Group>
            
           <Recaptcha
                  ref={e => recaptchaInstance = e}
                  sitekey="6LcIFdAaAAAAAENI3sqaj5ARz7DOYMovZng2lHO3"
                  verifyCallback={verifyCallback}
                />
                {<button class="btn btn-dark" onClick={resetRecaptcha}>
                  Reset Recaptcha
                </button>}
                <br/>
              
            <Button
              className=""
              variant="primary"
              size="lg"
              type="submit"
              block
              onClick={performLogin}
            >
              Login
            </Button>
          </Form>
          <NavLink to="/register">
              Register a user
            </NavLink>
        </Card.Body>
      </Card>
      {/* <div align="center">
          <br />
          <br />
          <br />
          <br />
          <h2>Welcome to our website!</h2>
          <br />
          <h3>Login to continue</h3>
          <form onChange={onChange}>
            <input placeholder="User Name" id="username" />
            <input placeholder="Password" id="password" />
            <button onClick={performLogin}>Login</button>
          </form>
          <p>{errorMes}</p>
        </div> */}
       </div>
    </div>
  );
}

export default LogInForm;
