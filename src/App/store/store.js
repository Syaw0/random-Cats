import create from "zustand"
import fetchCat from "./fetchCat"

const useStore = create((set , get)=>({
    rerenderWholeApp:false,
    isUserLoginBefore:false,
    currentImg :"" ,
    isRepeatImg:false , 
    failCall:false,
    favImgs:[] ,
    isLoadingHome:true,
    isLoadingFav:true,
    getUserLogin:()=>{
        if(localStorage.getItem("loginStatus") == null){
            set(state=>{return{...state ,isUserLoginBefore:false}})
            localStorage.setItem("loginStatus" , true)
            
        }else{
            set(state=>{return{...state , isUserLoginBefore:true}})
        }} ,
        setCurrentImg:async()=>{
            try{
                set(state=>{return{...state,isLoadingHome:true}})
                let catImg = await fetchCat()
                if(JSON.parse(localStorage.getItem("favImgs")).find((v)=>v==catImg) !== undefined){
                    set(state=>{return{...state , currentImg:catImg , isRepeatImg:true , isLoadingHome:false , failCall:false}})

                }else{set(state=>{return{...state , currentImg:catImg, isRepeatImg:false , isLoadingHome:false , failCall:false}})}
                
            }catch(err){
                
                set(state=>{return{...state,failCall:true , isLoadingHome:false}})
            }
        },
        firstRenderFavImgs:()=>{
            if(localStorage.getItem("favImgs") == null){
                let someData = []
                someData = JSON.stringify(someData)
                localStorage.setItem("favImgs"  , someData)
            }
        } , 
        setRepeatImg:(v)=>{
            set(state=>{return{...state , isRepeatImg:v}})
        },
        insertImgToFavList:()=>{
            let imgListFromLocalStore = JSON.parse(localStorage.getItem("favImgs"))
            if(imgListFromLocalStore == null){
                
                localStorage.setItem("favImgs" , "[]")
            }else{
                set(state=>{return{...state,favImgs:imgListFromLocalStore }})
            }
        },
        deleteSpecificItemFromList:(v)=>{   
            let newList = JSON.parse(localStorage.getItem("favImgs")).filter((img)=>v!=img)
            set(state=>{return{...state , favImgs:newList}})
            localStorage.setItem("favImgs" ,  JSON.stringify(newList))
        },
        rerenderWholeapp:()=>{
            set(state=>{return{...state , rerenderWholeApp:true}})
        }

}))



export default useStore 
