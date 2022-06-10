import React from "react";
import MainHome from "../components/MainHome";
import LandPage from "../components/LandPage";
import useStore from "../store/store";
function Home() {
  const userLoginStatus  =useStore(state=>state.isUserLoginBefore)
  const rerender  =useStore(state=>state.rerenderWholeApp)
  return	(<>
    <div id="Home_con">
    {userLoginStatus && <MainHome/>}
    {!userLoginStatus && <LandPage/>}
    </div>
</>)
  
}

export default Home;
