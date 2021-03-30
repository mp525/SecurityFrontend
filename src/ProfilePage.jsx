import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [profile, setProfile] = useState();
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [userName,setUsername]=useState();
  const [email,setEmail]=useState();
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
    if(dataFromServer){
      facade
      .fetchProfileInfo(dataFromServer.substring(9, 13),setProfile)
      .then((data) => setProfile(data))
      .catch((err) => {
        throw(err)
      });
    }
    
  }, [profile]);

  useEffect(()=>{
    if(profile!=null){
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

        <div className="info">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s profile information</h3>
          <table className="table">
            <thead><tr><th>First name</th><th>Last name</th><th>Email</th><th>Username</th></tr></thead>
            <tbody>
                <tr><td>{fname}</td><td>{lname}</td><td>{email}</td><td>{userName}</td> </tr>

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