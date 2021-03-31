import React, { useState, useEffect } from "react";

function LogInForm({ login, errorMes ,setErrorMes}) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    useEffect(() => {
        setErrorMes("");
    }, []);
   
    const performLogin = (evt) => {
      evt.preventDefault();
      login(loginCredentials.username, loginCredentials.password)
      
    }
    const onChange = (evt) => {
      setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
    }
   
    return (
      <div align="center">
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>Welcome to our website!</h2>
        <br/>
        <h3>Login to continue</h3>
        <form onChange={onChange} >
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button onClick={performLogin}>Login</button>
        </form>
    <p>{errorMes}</p>
      </div>
    )
   
  }

  export default LogInForm;