import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import { Table, Button, Row, Form, Card, Image } from "react-bootstrap";
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
      <Card className="m-2">
        <Card.Body>
          {Object.keys(pictures).map((key) => {
            let picture = pictures[key];
            if (picture.content) {
              return (
                <React.Fragment>
                  <Image src={picture.content} rounded />;
                </React.Fragment>
              );
            }
          })}
        </Card.Body>
      </Card>
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
            <Button className="m-2" onClick={handleSubmit}>
              Upload
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default PictureHandling;
