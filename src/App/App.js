import React,{useEffect} from "react";
import { Route , Routes ,Outlet} from "react-router-dom";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Favorite from "./page/Favorite"
import Template from "./page/Template"
import useStore from "./store/store"

window.addEventListener("resize", () => {
  document.getElementById("root").width = window.innerWidth;
});



function App() {
  const setUserLogin = useStore(state=>state.getUserLogin)
  const setFavList = useStore(state=>state.firstRenderFavImgs)

  useEffect(()=>{
    setUserLogin() ; 
    setFavList()
  },[])
  
  return	(<Routes>
    <Route path="/" element={<Template/>} >
    <Route index element={<Home/>} />
    <Route path="/fav" element={<Favorite/>} />
    </Route>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
  	
  
}

export default App;
