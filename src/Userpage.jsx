import React, { useEffect, useState } from "react";
import "./App.css";
import facade from "./apiFacade";
 
function Userpage() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  
  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

 

  return (
    <div>
      
        
    </div>
  );
}
export default Userpage;