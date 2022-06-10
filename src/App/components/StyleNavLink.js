import React from "react";
import {NavLink} from "react-router-dom"



function StyledNavLink(props) {
  return	(<>
  
        <NavLink to={props.to} id={props.id} className={({isActive})=> isActive?"activeLink":"deActiveLink"}>{props.inner}</NavLink>
</>)
  
}

export default StyledNavLink;


