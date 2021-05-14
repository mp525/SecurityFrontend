import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,Hint
} from "react-bootstrap";
import Recaptcha from 'react-recaptcha'

function MakePost() {
    const [errorMes, setErrorMes] = useState("");
    const [dataFromServer, setDataFromServer] = useState("Error");
    const [newPost, setNewPost] = useState("");
    const [profile, setProfile] = useState();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState();
    const [userResult, setUserResult] = useState("");
    const [valiCheck, setValiCheck] = useState();
    const [verify, setVerify] = useState(false);
    const [token,setToken]=useState("");

    let recaptchaInstance;
    let token1;
    useEffect(() => {
        facade.fetchDataUser()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
            err.fullError.then((err) => {
                setErrorMes(err.message);
            });
        });
    }, [dataFromServer]);


    useEffect(() => {
        const uName = dataFromServer.lastIndexOf(' ');
        const result = dataFromServer.substring(uName+1);
        setUserResult(result);
        console.log(result);
        facade
          .fetchProfileInfo(result, setProfile)
          .then((data) => setProfile(data))
          .catch((err) => {
            throw (err)
          });
    }, [dataFromServer]);

    useEffect(() => {
      if (profile != null) {
        setFname(profile.firstName);
        setLname(profile.lastName);
        setUsername(profile.userName);
        setEmail(profile.email);
      }
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const prop = target.id;
        let tmpPost = { ...newPost, [prop]: value };
        let tmp2 = { ...tmpPost, user: {token}}
        setNewPost(tmp2);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMes("");
        if(verify){
        await facade.addPosten(newPost).then(data=>setValiCheck(data)).catch(err=>console.log(err));
      }
    }
    const resetRecaptcha = () => {
      recaptchaInstance.reset();  
    };
    const verifyCallback = (response) => {
      if(response){
        token1=response;
        setToken(response);
        
        setVerify(true);
        
      }
    };
    return (
        <div className="info">
            <h3>Make a post</h3>
            <div class="alert alert-primary" role="alert">
                {valiCheck}
              </div>
            <form>
                <input style={{height:"200px", width:"80%"}} type="text" id="content" onChange={handleChange}/>
                {/* <input type="text" id="user" value={userName} onChange={handleChange}/> */}
                {/* <button onClick={handleSubmit}>Send post</button> */}
                <br/>
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
                <Button onClick={handleSubmit}>Send post</Button>
                <p>{errorMes}</p>
            </form>
            
        </div>
    )
}

export default MakePost;