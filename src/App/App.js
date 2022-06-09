import React from "react";
import { Route , Routes ,Outlet} from "react-router-dom";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

window.addEventListener("resize", () => {
  document.getElementById("root").width = window.innerWidth;
});



function App() {
  return	(<Routes>
    <Route path="/" element={<Outlet/>} >
    <Route index element={<Home/>} />
    </Route>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
  	
  
}

export default App;
