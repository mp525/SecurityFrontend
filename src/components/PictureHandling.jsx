import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import { Table, Button, Row } from "react-bootstrap";
function PictureHandling() {
  const [fileName, setFileName] = useState("");

  let fileReader;
  let finishedImage;
  //Store converted image in "Class" variable
  const handleFileRead = (e) => {
    finishedImage = fileReader.result;
  };

  //Onchange function - Begin converting the image as soon as it is uploaded
  const handleFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="pictures">
      <h3 align="center"> Your pictures here</h3>
      <div className="border border-secondary">
        <br />
        <br />
      </div>
      <div></div>
      <div align="center">
        <div className="sixth">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="image"
              accept=".jpeg, .png, .jpg"
              aria-describedby="inputGroupFileAddon01"
              onInput={(e) => setFileName(e.target.files[0].name)}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <label className="custom-file-label" htmlFor="image">
              {fileName}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PictureHandling;
