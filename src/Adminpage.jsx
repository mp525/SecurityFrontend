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
  const [click, setClick] = useState(false);
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
    
  },[]);

  const submitTitle = () => {
    facade.fetchAllProfile(setUsers)
  };

return (
  <div>
    <h3>{dataFromServer}</h3>
    <p>{errorAdmin}</p>
    <button onClick={submitTitle} className="myButton"></button>
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
         {users&& console.log(users)}
        </tbody>
        <h1>{click &&(
          users.map((x) => {      
              return (
                  <h1>{x.length}</h1>
              )})
        )}</h1>
      </Table>
      </>
    )}
  </div>
);
}
export default Adminpage;
