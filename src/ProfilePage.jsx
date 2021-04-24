import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import PostUserPart from "./ProfilePost"
import PictureHandling from "./PictureHandling";
import {
  Table,
  Button,
  Row
} from "react-bootstrap";
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [profile, setProfile] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUsername] = useState();
  const [email, setEmail] = useState();
  const [picture, setPic] = useState();
  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, [dataFromServer]);
  useEffect(() => {
      facade
        .fetchProfileInfo(dataFromServer.substring(15,20), setProfile)
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
  })
  return (
    <div className="main">
      <div align="center">
        <h1>Profile Page for {dataFromServer.substring(9, 20)}</h1>
        <p>{errorUser}</p>
        <Row>
          <div className="cardCustom">
            <h1>Name: {fname}</h1>
            {picture &&
              <img src={picture} style="width:100%" />
            } {!picture && <h5 className="title">No profile picture</h5>}
            <p class="title">Username: {userName}</p>
            <p class="title">Last name: {lname}</p>
          </div>
          <div className="info">
            <h3 align="center">{dataFromServer.substring(15, 20)}'s profile information</h3>
            <table className="table">
              <thead><tr><th>First name</th><th>Last name</th><th>Email</th><th>Username</th></tr></thead>
              <tbody>
                <tr><td>{fname}</td><td>{lname}</td><td>{email}</td><td>{userName}</td> </tr>
              </tbody>
            </table>
          </div>
        </Row><br /><br /><br />
        <PictureHandling></PictureHandling>
        <br />
        <PostUserPart></PostUserPart>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
      <div align="center">
      <Footer></Footer>
      </div>
      <br /><br />
    </div>
  );
}
export default Userpage;