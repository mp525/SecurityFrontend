import React, {useState,useEffect } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'

import {
  Table,
  Button
} from "react-bootstrap";
function Adminpage() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
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
  <div align="center" className="BlueBC">

    
    <h1 className="OB">Welcome to the Admin Page</h1>
    <br/>
    <div className="info">
    
    <h3>{"Welcome to"+dataFromServer.substr(16,18)}</h3>
    <Button   onClick={submitTitle} className="myButton">Manage Users<br/></Button>
    <p>{errorAdmin}</p>
    
<br/>
    {facade.isAdmin().indexOf("admin") !== -1 && (
      <>
      <Table striped bordered hover size="sm">
      
        <thead>
          <tr><th>First Name</th><th>Last Name</th><th>User Name</th><th>Email</th></tr>
        </thead>
        <tbody>
         
        {
        users &&(
          users.map((x,idx) => {      
              return (
                  <tr key={idx}>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.userName}</td>
                  <td>{x.email}</td>
                  <td><Button variant="warning">Edit</Button>{' '}</td>
                  <td><Button variant="danger">Delete</Button> </td>
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
        <br/><br/>
      </Table>
      </>
    )}
    
   
    </div>
    <br/><br/><br/><br/>
    <div className="info">
    
    <h3>Moderate Posts</h3>
    <h4>Delete Posts with unwanted content</h4>
    <Button   onClick={submitTitle} className="myButton">Manage Posts<br/></Button>
    <Table striped bordered hover size="sm">
    <thead>
          <tr><th>Author Username</th><th>Content</th></tr>
        </thead>
    {
        posts &&(
          posts.map((x,idx) => {      
              return (
                  <tr key={idx}>
                  <td>{x.content}</td>
                  
                  <td><Button variant="warning">Edit</Button>{' '}</td>
                  <td><Button variant="danger">Delete</Button> </td>
                  </tr>
              )})
        )}
        
   
    <br/><br/>
    </Table>
  </div>
  <br/><br/><br/><br/><br /><br />
  <Footer></Footer><br /><br /><br /><br />  
  </div>
);
}
export default Adminpage;
