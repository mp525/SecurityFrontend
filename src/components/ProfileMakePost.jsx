import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Hint } from "react-bootstrap";
import checkInput from "./InputChecker.js";

function MakePost() {
  const [errorMes, setErrorMes] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [newPost, setNewPost] = useState({});
  const [profile, setProfile] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [userResult, setUserResult] = useState("");

  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
  }, [dataFromServer]);

  useEffect(() => {
    const uName = dataFromServer.lastIndexOf(" ");
    const result = dataFromServer.substring(uName + 1);
    setUserResult(result);
    console.log(result);
    facade
      .fetchProfileInfo(result, setProfile)
      .then((data) => setProfile(data))
      .catch((err) => {
        throw err;
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
    let tmp2 = { ...tmpPost, user: {} };
    if (tmp2.content.length > 300) {
      setErrorMes("Over 300 characters, please delete some text");
    } else {
      setErrorMes("");
      setNewPost(tmp2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newPost);
    let checked = checkInput(newPost.content);
    if (checked === "Error") {
      setErrorMes("Input not allowed");
    } else {
      setErrorMes("");

      console.log(newPost);

      facade.addPosten(newPost).catch((err) => {
        err.fullError.then((err) => {
          setErrorMes("Your post cannot be empty.");
        });
      });
      setNewPost({ content: "" });
      console.log(newPost);

      /* setErrorMes("");
          if(verify){
          await facade.addPosten(newPost).then(data=>setValiCheck(data)).catch(err=>console.log(err));
        } */
    }
  };

  return (
    <div className="info">
      <h3>Make a post</h3>
      <form>
        {/* <input style={{height:"200px", width:"80%", flexWrap:"wrap"}} type="text" id="content" onChange={handleChange}/> */}
        <textarea
          style={{ height: "200px", width: "80%" }}
          wrap="hard"
          id="content"
          type="text"
          onChange={handleChange}
        ></textarea>
        <br />
        <div>
          {/* <button onClick={resetRecaptcha}>
                  Reset
                </button> */}
        </div>
        <Button onClick={handleSubmit}>Send post</Button>
        <p>{errorMes}</p>
      </form>
    </div>
  );
}

export default MakePost;
