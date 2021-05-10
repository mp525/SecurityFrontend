import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import facade from "./apiFacade";

function RegisterForm({ login, errorMes, setErrorMes }) {
  const [user, setUser] = useState({userName:"", password:"", firstName:"", lastName:"", email:""});
  const [msg, setMsg] = useState("");
  const [valiCheck,setValiCheck]=useState();
  const conditions=[
    user.password == user.password.toUpperCase(),
    user.password == user.password.toLowerCase(),
    user.password.length<8,
    !isNaN(user.password * 1),
    user.userName.length<8

  ];
  //const [loginCredentials, setLoginCredentials] = useState(init);

  useEffect(() => {
    //setErrorMes("");
  }, []);

  const register = (evt) => {
    evt.preventDefault();
    if (!conditions[0]&&!conditions[1]&&!conditions[2]&&!conditions[3]) {
      facade.register(user, setMsg);
    }else{
      setValiCheck("Make sure the password is made correctly");
    }
    //login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    const id = evt.target.id;
    const value = evt.target.value;
    const tmpUser = {...user, [id]:value};
    
    if (!conditions[0]&&!conditions[1]&&!conditions[2]&&!conditions[3]) {
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

  return (
    <div>
      <div align="center">
      <Card style={{ width: "18rem" }}>
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
              <Form.Control type="text" placeholder="Username" id="userName" min="10"/>
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

export default RegisterForm;
