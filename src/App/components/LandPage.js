import React from "react";
import Ico_catLaugh from "../asesst/icons/Ico_catLaugh";
import Button from "../components/Button"
import Ico_catLove from "../asesst/icons/Ico_catLove";
import Ico_fish from "../asesst/icons/Ico_fish"
import useStore from "../store/store";

function LandPage() {
  
  const rerender  =useStore(state=>state.rerenderWholeapp)
  return	(<>
    <div id="LandPage_con">
    <p id="landPage_head1">Welcome To The <span style={{color:"#002117" , textDecoration:"2px underline #002117" , fontFamily:"Fraunces-extraBold"}}>Cat World</span></p>
    <p id="landPage_head2">I Am Mio Mao<span><Ico_catLaugh/></span><br></br> I Love with My Fish<span><Ico_catLove/><Ico_fish/></span> <br></br>In This App I Show you A Random Cats Image</p>
    <Button inner="GetStart" id="getStartBtn" type="primary" event={()=>{window.location.reload()}}/> 
    </div>  
</>)
  
}

export default LandPage;
