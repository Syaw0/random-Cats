import React from "react";
import NavBar from "../components/NavBar"
import {Outlet} from "react-router-dom"

function Template() {
  return	(<>
    <div id="Template_con">
    <NavBar/>
<Outlet/>
    </div>
</>)
  
}

export default Template;
