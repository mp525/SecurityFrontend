import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button
} from "react-bootstrap";
import Recaptcha from 'react-recaptcha'

function MakePost() {
    const [errorMes, setErrorMes] = useState("");
    const [dataFromServer, setDataFromServer] = useState("Error");
    const [newPost, setNewPost] = useState("");
    const [profile, setProfile] = useState();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [userResult, setUserResult] = useState("");
    const [valiCheck, setValiCheck] = useState();
    const [verify, setVerify] = useState(false);
    let recaptchaInstance;

    useEffect(() => {
        facade.fetchDataUser()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
            err.fullError.then((err) => {
                setErrorMes(err.message);
            });
        });
    }, [dataFromServer]);

    /* useEffect(() => {
        facade
          .fetchProfileInfo(dataFromServer.substring(9, 13), setProfile)
          .then((data) => setProfile(data))
          .catch((err) => {
            throw (err)
          });
    }, [dataFromServer]); */

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
        console.log("userresult:" + userResult);
      }
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const prop = target.id;
        let tmpPost = { ...newPost, [prop]: value };
        let tmp2 = { ...tmpPost, user: {...profile}}
        setNewPost(tmp2);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(newPost);
        setErrorMes("");
        facade.addPosten(newPost).catch((err) => {
            err.fullError.then((err) => {
                setErrorMes("Your post cannot be empty.")
            })
        });
        setNewPost({content:""});
    }
    const resetRecaptcha = () => {
      recaptchaInstance.reset();  
    };
    const verifyCallback = (response) => {
      if(response){
        setVerify(true);
      }
    };
    return (
        <div className="info">
            <h3>Make a post</h3>
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