import React, {useState,useEffect } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table
} from "react-bootstrap";
function Adminpage() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    facade
      .fetchDataAdmin()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  useEffect(() => {
    facade
      .fetchAllProfile(setUsers)
      .then((data) => setUsers(data))
      .catch(err=>console.log(err))
    
    
  }, [dataFromServer]);

return (
  <div>
    <h3>{dataFromServer}</h3>
    <p>{errorAdmin}</p>
    {facade.isAdmin().indexOf("admin") !== -1 && (
      <>
      <Table className="table">
        <thead>
          <tr><th>First Name</th><th>Last Name</th><th>User Name</th><th>Email</th></tr>
        </thead>
        <tbody>
         
        {
        users &&(
          users.map((x) => {      
              return (
                  <tr key={x.firstName}>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.userName}</td>
                  <td>{x.email}</td>
                  </tr>
              )})
        )}
         {console.log(users)}
        </tbody>
      </Table>
      </>
    )}
  </div>
);
}
export default Adminpage;
