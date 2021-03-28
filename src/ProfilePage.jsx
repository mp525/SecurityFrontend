import React, { useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
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


  return (
    <div className="main">
      <div align="center">
        <h1>Profile Page for {dataFromServer.substring(9, 20)}</h1>
        <p>{errorUser}</p>

        <div className="info">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s profile information</h3>
          <table className="table">

            <thead><th>First name</th><th>Last name</th><th>Email</th><th>Username</th></thead>
            <tbody>
              <td>Matti</td><td>Hansen</td><td>m@g.com</td><td>MBMBMBM</td>
            </tbody>

          </table>


        </div>
        <div className="pictures">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s pictures here</h3>
          <div class="border border-secondary">
            <br /><br />

          </div>

          <div align="center">
            <div className="sixth">
              <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0" />
              <div class="input-group-append">
                <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />         <br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br />


        <div className="footy">
          <h3>BSH Production CyperSec</h3>
        </div>
      </div>

    </div>
  );
}
export default Userpage;