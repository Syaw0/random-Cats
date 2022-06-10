import React from "react";
import Ico_catCry from "../asesst/icons/Ico_catCry"
import Template from "./Template"



function NotFound() {
  return (
        <>
          <Template/>
          <div id="NotFound_con">
            <p id="notfoundText">
            <span style={{font:"var(--headline1)" , fontFamily:"Fraunces-Bold"}}>ERROR 404</span> <br></br>
              i can not found what you want <span><Ico_catCry/></span>
            </p>
          </div>
        </>
  )  
}

export default NotFound;
