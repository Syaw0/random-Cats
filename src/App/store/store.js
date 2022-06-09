import create from "zustand"
const useStore = create((set , get)=>({
    recipesSummary:{   } ,
    recipes:{},
    random3:[] , 
    bannerInner:"",
    pageOffest:0,
    isNavShow:false,
    getRecipeCategory:async(category)=>{
        let categoryData = await getCategory(category)
        let newSummaryData = {}
        let recipeData = {}
        newSummaryData[category] = categoryData
        for(let i = 0 ; i!= newSummaryData[category].length ; i++){

            let data = await getRecipe(newSummaryData[category][i].idMeal)
            recipeData[newSummaryData[category][i].idMeal] = data
            
        }
        set(state=>{return{...state ,recipes:{...get().recipes  , ...recipeData} ,recipesSummary:{...get().recipesSummary, ...newSummaryData }  , }})
    } , 
    getRandomRecipe:async()=>{
        let random = []
        let recipes = {}
        for(let i = 0 ; i != 3 ; i++){
            let data = await getRandom()
            if(get().recipes[data.idMeal] == undefined){
                recipes[data.idMeal] = data
                
            }
            random.push(data)
            
        }
        
        set(state=>{return{...state , random3:random , recipes:{...state.recipes , ...recipes}}})
    } ,
    setBanner : (value)=>set(state=>{return{...state, bannerInner:value}}) ,
    setPageOffest:(value)=>{set(state=>{return{...state, pageOffest:value}}) },
    setNavDisplay:(value)=>set(state=>{return{...state, isNavShow:value}})


}))



async function getCategory(query){

    try{
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
    let resp = await fetch(url)
    let data = await resp.json()
    return data.meals
    }catch(err){
        console.log(err)
    }
    
}



async function getRecipe(query){

    try{
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`
    let resp = await fetch(url)
    let data = await resp.json()
    return data.meals[0]
    }catch(err){
        console.log(err)
    }
   
}


async function getRandom(){

    try{
    let url = `https://www.themealdb.com/api/json/v1/1/random.php`
    let resp = await fetch(url)
    let data = await resp.json()
    return data.meals[0]
    }catch(err){
        console.log(err)
    }
   
}




export default useStore 