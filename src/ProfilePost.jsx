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
function ProfilePage() {
    const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const [word, setWord] = useState("");
  const [posts, setPosts] = useState([]);
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
    facade.fetchAllUserPosts(dataFromServer.substring(9, 13), setPosts)
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    console.log(value);
    setWord(value)
  };
return (
<div className="info">
<h3>Your Posts</h3>
<Button onClick={getAll} className="myButton">See Posts<br /></Button>
<Button onClick={getByWord} className="myButton">See all with word<br /></Button>
<input type="text" value={word} onChange={handleChange} />
<table className="table">
  <thead><tr><th>Content</th><th>Posted</th></tr></thead>
  <tbody>
    {posts && (
      posts.map((x, idx) => {
        return (
          <tr key={idx}>
            <td>{x.content}</td>
            <td>{x.posted}</td>

          </tr>
        )
      })
    )}
  </tbody>
</table>
</div>
  );
}
export default ProfilePage;
