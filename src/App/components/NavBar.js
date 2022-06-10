
import React from "react";
import StyledNavLink from "./StyleNavLink";
import Ico_catNormal from "../asesst/icons/Ico_catNormal";

function Home() {
  return	(<>
<nav id="NavBar">
    <div id="NavBar_left">
      <p id="logo">Mio Mao</p>
      <Ico_catNormal/>
    </div>

    <div id="NavBar_right">
    <StyledNavLink to={"/"} inner="Home" id="Home_Btn"/>
<StyledNavLink to={"/fav"} inner="Favorite" id="Fav_Btn"/>
    </div>

</nav>
</>)
  
}

export default Home;


