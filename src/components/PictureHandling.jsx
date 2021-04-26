import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import facade from "../apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'
import {
  Table,
  Button,
  Row
} from "react-bootstrap";
function PictureHandling() { 
return (
<div className="pictures">
          <h3 align="center"> Your pictures here</h3>
          <div className="border border-secondary">
            <br /><br />
          </div>
          <div>
          </div>
          <div align="center">
            <div className="sixth">
              <form action="/upload" method="post" enctype="multipart/form-data" >
                <input type="file" name="file" size="50" />
                <input type="submit" value="Upload File" />
              </form>
            </div>
          </div>
        </div>
  );
}
export default PictureHandling;
