import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";

function LogInForm({ login, errorMes, setErrorMes }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  useEffect(() => {
    setErrorMes("");
  }, []);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <div align="center">
      <Card style={{ width: "18rem" }}>
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
        </Card.Body>
      </Card>
      {/*
      <div align="center">
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
      </div>
      */}
      </div>
    </div>
  );
}

export default LogInForm;
