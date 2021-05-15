import React, { useState, useEffect,useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import facade from "./apiFacade";
import Recaptcha from 'react-recaptcha'

function RegisterForm({ login, errorMes, setErrorMes }) {
  const [user, setUser] = useState({ userName: "", password: "", firstName: "", lastName: "", email: "" ,token:""});
  const [msg, setMsg] = useState("");
  const [tokenstate,setTokenstate]=useState("");
  const [valiCheck, setValiCheck] = useState();
  const [verify, setVerify] = useState(false);
  let recaptchaInstance;
  let token1;
  const conditions = [
    user.password == user.password.toUpperCase(),
    user.password == user.password.toLowerCase(),
    user.password.length < 8,
    !isNaN(user.password * 1),
    user.userName.length < 8

  ];
  //const [loginCredentials, setLoginCredentials] = useState(init);

  useEffect(() => {
    //setErrorMes("");
  }, []);

  const register = (evt) => {
    evt.preventDefault();
    if (verify == true) {
      if (!conditions[0] && !conditions[1] && !conditions[2] && !conditions[3]) {
        user.token=tokenstate;
        console.log(user.token);
        facade.register(user, setMsg);
        setValiCheck("You have succesfully registered yourself");
      } else {
        setValiCheck("Make sure the password is made correctly");
      }
    } else {
      setValiCheck("Please verify that you are human");
    }


    //login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    const id = evt.target.id;
    const value = evt.target.value;
    const tmpUser = { ...user, [id]: value };

    if (!conditions[0] && !conditions[1] && !conditions[2] && !conditions[3]) {
      setValiCheck("Password corresponds to our guidelines");
    }
    if (conditions[0]) {
      setValiCheck("Needs one uppercase");
    }
    if (conditions[1]) {
      setValiCheck("Needs one lowercase");
    }
    if (conditions[2]) {
      setValiCheck("Minimum 8 characters!");
    }
    if (conditions[3]) {
      setValiCheck("Needs one Numeric character");
    }
    if (conditions[4]) {
      setValiCheck("Name needs to have a length of 8 or more");
    }



    setUser(tmpUser);
  };
  const resetRecaptcha = () => {
    recaptchaInstance.reset();  
  };
  const verifyCallback = (response) => {
    if(response){
      token1=response;
      setTokenstate(response);
      console.log(user.token);
      console.log(token1);
      setVerify(true);
      
    }
  };
  return (
    <div>
      <div classname="container" align="center">

      <div className="row">
      
      <div className="col-sm">

      </div>
      <div className="col-lg"> 
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title className="text-center">
              Register for our website!
          </Card.Title>
          
            <Card.Text className="text-center">Register</Card.Text>
            <Form onChange={onChange}>
              <div class="alert alert-primary" role="alert">
                {valiCheck}
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Username" id="userName" min="10" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicFirstName">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  id="firstName"

                />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  id="lastName"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                />
              </Form.Group>
              <div>
                <Recaptcha
                  ref={e => recaptchaInstance = e}
                  sitekey="6LcIFdAaAAAAAENI3sqaj5ARz7DOYMovZng2lHO3"
                  verifyCallback={verifyCallback}
                />
                {/* <button onClick={resetRecaptcha}>
                  Reset
                </button> */}
              </div>
              <Button
                className=""
                variant="primary"
                size="lg"
                type="submit"
                block
                onClick={register}
              >
                Register
            </Button>
            </Form>
          </Card.Body>
          {msg && (
            <>
              <p>You have been registered!</p>
            </>
          )}
        </Card>
        <br/>
      </div>
      <div className="col">
        <h1>Requirements</h1>
        <ul  class="list-group list-group-flush"/>
        <li class="list-group-item">Username should have a Minimum of 8 characters!</li>
        <li class="list-group-item">Password should have a Minimum of 8 characters!</li>
        <li class="list-group-item">Password should have a Capital and Non Capital letter!</li>
        <li class="list-group-item">Password should have 1 Numeric character!</li>
      </div>
      </div>
      </div>
    </div>
  );
}

export default RegisterForm;
