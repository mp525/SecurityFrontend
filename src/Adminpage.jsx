import React, {useState,useEffect } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'

import {
  Table,
  Button,Card
} from "react-bootstrap";
function Adminpage() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState();
  const [delText,setDelText]=useState();
  const [edit,setEdit]=useState(false);
  const[id,setEditID]=useState();
  const[content,setContent]=useState();
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

  const submitTitle = () => {
    facade.fetchAllProfile(setUsers)
  };
  const fetchPosts = () => {
    facade.fetchAllPostsAdmin(setPosts);
  };
  const deletePost = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    facade.deletePosten(id);
  };
  const startEdit = (e) => {
    e.preventDefault();
    const id1 = e.target.id;
    setEditID(...id1);
    setEdit(true);
  };
  const editPost = (e) => {
    e.preventDefault();
   let tmpDTO={id,content};
   console.log(tmpDTO);
    facade.editPosten(tmpDTO);
  };
  const editOnChange=(e)=>{
      const target = e.target; 
      const property = target.id; 
      const value = target.value;
      const tmpContent = value;
      setContent(tmpContent);
  }
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
         {edit&&console.log(edit)}
        {
        users &&(
          users.map((x,idx) => {      
              return (
                  <tr key={idx}>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.userName}</td>
                  <td>{x.email}</td>
                  <td><Button variant="warning" id={x.id}>Edit</Button> </td>
                  <td><Button variant="danger" >Delete</Button> </td>
                  </tr>
              )})
        )}
        </tbody>
       
        <br/><br/>
      </Table>
      </>
    )}
    </div>
   
    <br/><br/><br/><br/>
    <div className="info">
    <h3>Moderate Posts</h3>
    <h4>Delete Posts with unwanted content</h4>
    <Button   onClick={fetchPosts} className="myButton">Manage Posts<br/></Button>
    <Table striped bordered hover size="sm">
    <thead>
          <tr><th>Author Username</th><th>Content</th><th>Name of author</th></tr>
        </thead>
    {
        posts &&(
          posts.list.map((x,idx) => {      
              return (
                <tbody>
                  <tr key={idx}>
                  <td>{x.posted}</td>
                  <td>{x.content}</td>
                  <td>{x.user.firstName+" "+ x.user.lastName}</td>
                  <td><Button variant="warning" onClick={startEdit} id={x.id}>Edit</Button>{' '}</td>
                  <td><Button variant="danger" onClick={deletePost} id={x.id}>Delete</Button> </td>
                  <td>{delText && <h1>{delText}</h1>}</td>
                  </tr>
                  </tbody>
              )})
        )}
        
   
    <br/><br/>
    </Table>
  </div>
  <div>
  {edit && (
        
          
            <Card border="dark" className="BlueBC">
              <h3>Edit Post: </h3>
              <form>
                <input type="text" disabled value={"ID: " + id&& id} />
                <br />
                <textarea
                  rows="5"
                  cols="60"
                  width="60%"
                  fontSize="medium"
                  defaultValue={content}
                  id="content"
                  onChange={editOnChange}
                />
                <br />
                <Button onClick={editPost}>Submit change</Button>
              </form>
              <br />
            </Card>
          )}

    </div>
  <br/><br/><br/><br/><br /><br />
  <Footer></Footer><br /><br /><br /><br />  
  </div>
);
}
export default Adminpage;
