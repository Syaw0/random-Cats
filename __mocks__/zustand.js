import actualCreate from "zustand"
import {act} from "react-dom/test-utils"

const reset = new Set()

const create = (createState)=>{
    const store = actualCreate(createState)
    const initialState = store.getState()
    reset.add(()=>store.setState(initialState,true))
    return store
}


afterEach(()=>{
    act(()=>reset.forEach((reset)=>reset()))
})


export default create