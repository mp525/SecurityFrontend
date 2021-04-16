import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import {
  Table,
  Button,
  Row
} from "react-bootstrap";
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [profile, setProfile] = useState();
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [userName,setUsername]=useState();
  const [email,setEmail]=useState();
  const [picture,setPic]=useState();
  const [word,setWord]=useState("");
  const [posts, setPosts]=useState([]);
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
    if(dataFromServer){
      facade
      .fetchProfileInfo(dataFromServer.substring(9, 13),setProfile)
      .then((data) => setProfile(data))
      .catch((err) => {
        throw(err)
      });
    }
    
  }, []);
  const getAll = () => {
    facade.fetchAllUserPosts(dataFromServer.substring(9, 13),setPosts)
  };
 
  const getByWord = () => {
    let arr=[];
    posts.filter(x=>{
      if(x!=null){
        if (x.content.includes(word)) {
          arr.push(x);
        }
      }
      
    })
     setPosts(arr);
  };
  const handleChange = (event) => {
    const target = event.target; 
     const value = target.value;
     console.log(value);
     setWord(value)};
//begyndt på ikke implementeret kan ikke nå mere så her er det indtil nu
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
        <Row>
        <div className="cardCustom">
         
  <h1>Name: {fname}</h1>
        {picture && 
        <img src={picture} style="width:100%"/>
        } {!picture &&<h5 className="title">No profile picture</h5>}

  <p class="title">Username: {userName}</p>
  <p class="title">Last name: {lname}</p>
  
  {dataFromServer&&  console.log(dataFromServer)}
        </div>
        <div className="info">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s profile information</h3>
          <table className="table">
            <thead><tr><th>First name</th><th>Last name</th><th>Email</th><th>Username</th></tr></thead>
            <tbody>
                <tr><td>{fname}</td><td>{lname}</td><td>{email}</td><td>{userName}</td> </tr>

            </tbody>
          </table>


        </div>
        </Row>
        <br/>
        <div className="pictures">
          <h3 align="center">{dataFromServer.substring(9, 13)}'s pictures here</h3>
          <div className="border border-secondary">
            <br /><br />

          </div>
          <div>
            {//posts && console.log(posts[1].content)
            }
            
          </div>
          <div align="center">
            <div className="sixth">
            <form action = "/upload" method = "post" enctype = "multipart/form-data" >
          <input type = "file" name = "file" size = "50" />
          <input type = "submit" value = "Upload File" />
          </form>
            </div>
          </div>
        </div><br/><br/><br/>
        <div className="info">
          <h3>Your Posts</h3>
          <Button   onClick={getAll} className="myButton">See Posts<br/></Button>
          <Button   onClick={getByWord} className="myButton">See all with word<br/></Button>
          <input type="text" value={word} onChange={handleChange} />
          <table className="table">
            <thead><tr><th>Content</th><th>Posted</th></tr></thead>
            <tbody>
               

           
          
            {posts &&(
          posts.map((x,idx) => {      
              return (
                  <tr key={idx}>
                  <td>{x.content}</td>
                  <td>{x.posted}</td>
                  
                  </tr>
              )})
        )}
         </tbody>
        </table>
          </div>
        <br /><br /><br /><br /> 
        <br /><br /><br /><br /><br /><br />
        
      </div>
      <div align="center">
        <Footer></Footer>
        </div>
        <br /><br />
    </div>
  );
}
export default Userpage;