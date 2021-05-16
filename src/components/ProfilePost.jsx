import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import {
  Table,
  Button,
  Row,Card
} from "react-bootstrap";
function ProfilePage() {
  const [word, setWord] = useState("");
  const [posts, setPosts] = useState([]);
  const [content,setContent]=useState("")
  const [edit, setEdit]=useState(false);
  const [id, setEditID]=useState();
  const [delText,setDelText]=useState("");
 
  const getByWord = () => {
    let arr = [];
    posts.filter(x => {
      if (x != null) {
        if (x.content.includes(word)) {
          arr.push(x);
        }
      }
    })
    setPosts(arr);
  };
  const getAll = () => {
    setDelText("");
    facade.fetchAllUserPosts(setPosts)
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setWord(value)
  };
  const deletePost = (e) => {
    e.preventDefault();
    const id = e.target.id;
    let deltext1=facade.deletePostenU(id);
    setDelText(id+" was deleted");
    //setTimeout(getAll,2000);

  };
  const startEdit = (e) => {
    e.preventDefault();
    const id1 = Number(e.target.id);
        setEditID(id1);
    setEdit(true);
  };
  const editPost = (e) => {
    e.preventDefault();
    

   let tmpDTO={"id":id,content};
    facade.editPostenU(tmpDTO);
    setTimeout(getAll,2000);
    setEdit(false);
  };
  const editOnChange=(e)=>{
      const target = e.target; 
      const property = target.id; 
      const value = target.value;
      const tmpContent = value;
      setContent(tmpContent);
  }
return (
<div className="info">
<h3>Your Posts</h3>
<Button onClick={getAll} className="myButton">See Posts<br /></Button>
<Button onClick={getByWord} className="myButton">See all with word<br /></Button>
<input type="text" value={word} onChange={handleChange} />
<table className="table">
  <thead><tr><th>Content</th><th>Posted</th><th>Edit</th><th>Delete</th></tr></thead>
  <tbody>
    {posts && (
      posts.map((x, idx) => {
        return (
          <tr key={idx}>
            <td  className="cell1">{x.content}</td>
            <td>{x.posted}</td>
            <td><Button variant="warning" onClick={startEdit} id={x.id}>Edit</Button>{' '}</td>
            <td><Button variant="danger" onClick={deletePost} id={x.id}>Delete</Button> </td>
          </tr>
        )
      })
    )}
    <h1>{delText&&delText}</h1>
  </tbody>
</table>
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
  );
}
export default ProfilePage;
