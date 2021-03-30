import React, { useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [profile, setProfile] = useState({});
  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  useEffect(() => {
    facade
      .fetchProfileInfo("user",setProfile)
      .then((data) => setProfile(data))
      .catch((err) => {
        console.log(err);
       
        console.log("wtf");
        
      });
  }, []);

  return (
    <div className="main">
      <div align="center">
        <h1>Profile Page for {dataFromServer.substring(9, 20)}</h1>
        <p>{errorUser}</p>

        <div className="info">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s profile information</h3>
          <table className="table">
            <thead><tr><th>First name</th><th>Last name</th><th>Email</th><th>Username</th></tr></thead>
            <tbody>
              
              {profile &&
                 (<tr><td>{profile.firstName}</td><td>{profile.lastName}</td><td>{profile.email}</td><td>{profile.userName}</td></tr>)
                }
            </tbody>

          </table>


        </div>
        <div className="pictures">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s pictures here</h3>
          <div className="border border-secondary">
            <br /><br />

          </div>

          <div align="center">
            <div className="sixth">
              <input id="upload" type="file" className="form-control border-0" />
              <div className="input-group-append">
                <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />         <br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br />


        <div className="footy">
          <h3>BSH Production</h3>
        </div>
      </div>

    </div>
  );
}
export default Userpage;