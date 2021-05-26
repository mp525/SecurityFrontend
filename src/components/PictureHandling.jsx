import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import { Table, Button, Row, Form } from "react-bootstrap";
import checkInput from "./InputChecker.js";

function PictureHandling() {
  const [fileName, setFileName] = useState();
  const [newPicture, setNewPicture] = useState({});
  const [pictures, setPictures] = useState({});
  const [errorMes, setErrorMes] = useState({});

  let fileReader;
  let finishedImage;
  const handleFileRead = (e) => {
    setNewPicture({ content: fileReader.result, user: {} });
  };

  const handleFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    facade.addPicture(newPicture);
    //setNewPicture({ content: "" });
  };
  useEffect(() => {
    facade.fetchAllUserPictures(setPictures);
    //console.log(pictures);
  }, []);

  return (
    <div className="pictures p-2">
      <h3 align="center"> Your pictures here</h3>
      <div className="mx-5 my-2 border border-secondary">
        <br />

        {
          //posts.list.reverse().map((post) => {

          Object.keys(pictures).map((key) => {
            let picture = pictures[key];
            if (picture.content) {
              return (
                <React.Fragment>
                  <img src={picture.content}></img>;
                </React.Fragment>
              );
            }
          })
        }

        {/* 
        {pictures.list && (
          <>
            {pictures.list.reverse().map((post) => {
              return (
                <div key={post.id}>
                  <Card bg="light" border="success" style={{ width: "40rem" }}>
                    <Card.Title as="h6">
                      Post by {post.user.userName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" as="p">
                      {post.posted}
                    </Card.Subtitle>
                    <Card.Body>
                      <Card.Text>{post.content}</Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            })}
          </>
        )}
*/}
        <br />
      </div>
      <div className="p-2" align="center">
        <Form>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="content"
              accept=".jpeg, .png, .jpg"
              aria-describedby="inputGroupFileAddon01"
              onInput={(e) => setFileName(e.target.files[0].name)}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <label className="custom-file-label" htmlFor="content">
              {fileName}
            </label>
            <Button onClick={handleSubmit}>Upload</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default PictureHandling;
