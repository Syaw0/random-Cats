import React from "react"
import App from "../src/App/App"
import {render,cleanup , waitFor , screen , fireEvent  } from "@testing-library/react"
import "@testing-library/jest-dom"
import {MemoryRouter} from "react-router-dom"
import fetchCat from "../src/App/store/fetchCat"
import useStore from "../src/App/store/store"
jest.mock("../src/App/store/fetchCat.js" , ()=>{return jest.fn(()=>Promise.resolve(
    "https://cataas.com/cat/6167c4e8412a9f0018729ee0"
))})

beforeEach(()=>{
    cleanup();
})



describe("app render correctly..." ,()=>{
    test("render App", async()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Home_con")).toBeInTheDocument())
    })
    test("other pages do not render" , async ()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#NotFound_con")).not.toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#Favorite_con")).not.toBeInTheDocument())
    })
})

describe('Navigating between pages', () => { 
    test("navigate to the Home Page" , async()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Home_con")).toBeInTheDocument())

    })
    test("navigate to the Favorite Page" ,async ()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        
        waitFor(()=>expect(con.container.querySelector("#Favorite_con")).toBeInTheDocument())

    })

    test("navigate to the Not Found Page" ,async ()=>{
        
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/somethingWrong"]}><App/></MemoryRouter>))
        //navigate to the wrong url  
        waitFor(()=>expect(con.container.querySelector("#NotFound_con")).toBeInTheDocument())
    })
 })


describe('when clicking on the Navbar Links navigate user to the specific page',()=>{
    test("click on the Home Btn" ,async ()=>{
                let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        
        fireEvent.click(con.container.querySelector("#Home_Btn"))
        await waitFor(()=>expect(con.container.querySelector("#Home_con")).toBeInTheDocument())
    })
    test("click on the Favorite Btn" , async()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        
        fireEvent.click(con.container.querySelector("#Fav_Btn"))
        await waitFor(()=>expect(con.container.querySelector("#Favorite_con")).toBeInTheDocument())
    })
})


describe("when user meet the app for first time show what page?" , ()=>{
    test("for first time render LandPage" ,async()=>{
        localStorage.clear()
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#MainHome_con")).not.toBeInTheDocument())

        await waitFor(()=>expect(con.container.querySelector("#LandPage_con")).toBeInTheDocument())
    })
    test("for other time render Main Home" ,async()=>{
        localStorage.removeItem("loginStatus")
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#LandPage_con")).not.toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#MainHome_con")).toBeInTheDocument())
    })
})


describe("when user go into a main home render correctly with img" , ()=>{
    test("render cat img correctly" , async()=>{
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Cat_card_img")).toBeInTheDocument())
        
    })

    test("img will full with address " , async()=>{
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Cat_card_img").src != "").toBeTruthy())
    })
    test("api call rejected " , async()=>{
        fetchCat.mockImplementationOnce(()=>Promise.reject("error"))
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#FailCall_con")).toBeInTheDocument())
    })
})


describe("user can add img to fav list and deleted" , ()=>{
    test("add imgs to fav list and button duty change to delete the item  " , async()=>{
        let someData = []
        someData = JSON.stringify(someData)
        localStorage.removeItem("favImgs")
        localStorage.setItem("favImgs" , someData  )
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#AddToFavList").innerHTML).toBe("ADD TO FAV"))
        fireEvent.click(con.container.querySelector("#AddToFavList")) 
        await waitFor(()=>expect(JSON.parse(localStorage.getItem("favImgs")).length).toEqual(1))
        await waitFor(()=>expect(con.container.querySelector("#AddToFavList").innerHTML).toBe("DELETE ITEM"))
        
    })

    test("delete Img from Fav List and button duty will change to add to fav" , async()=>{
        let someData = [ "https://cataas.com/cat/6167c4e8412a9f0018729ee0"]
        someData = JSON.stringify(someData)
        localStorage.removeItem("favImgs")
        localStorage.setItem("favImgs" , someData  )
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#AddToFavList").innerHTML).toBe("DELETE ITEM"))
        fireEvent.click(con.container.querySelector("#AddToFavList")) 
        await waitFor(()=>expect(JSON.parse(localStorage.getItem("favImgs")).length).toEqual(0))
        await waitFor(()=>expect(con.container.querySelector("#AddToFavList").innerHTML).toBe("ADD TO FAV"))
        
    })
})



describe("when user click on the next img" , ()=>{

    test("when user come to the home page fo first time showup loading" ,async ()=>{
        localStorage.setItem("loginStatus" , true)
        let con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>)
        await waitFor(()=>expect(con.container.querySelector("#Loader_con")).toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#NextImg").innerHTML).toBe("See Next"))


    })

    test("wait time end and img card will show up" ,async ()=>{
        localStorage.setItem("loginStatus" , true)
        let con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>)
        await waitFor(()=>expect(con.container.querySelector("#Loader_con")).toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#Cat_card_img")).toBeInTheDocument())

    })

    test("click on the Next img button and loader will showup" ,async ()=>{
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#NextImg").innerHTML).toBe("See Next"))
        fireEvent.click(con.container.querySelector("#NextImg"))
        await waitFor(()=>expect(con.container.querySelector("#Loader_con")).toBeInTheDocument())

    })


    test("click on the Next img button and loader will showup then img will load" ,async ()=>{
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#NextImg").innerHTML).toBe("See Next"))
        fireEvent.click(con.container.querySelector("#NextImg"))
        await waitFor(()=>expect(con.container.querySelector("#Loader_con")).toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#NextImg").innerHTML).toBe("See Next"))

    })

    test("First time render img but then when click on the  next img got error from server and render fail Con and fade card img" ,async ()=>{
        fetchCat.mockImplementationOnce(()=>{
            return Promise.resolve(
                "https://cataas.com/cat/6167c4e8412a9f0018729ee0"
            )
        })
        fetchCat.mockImplementationOnce(()=>{
            return Promise.reject(
                "return"
            )
        })
        localStorage.setItem("loginStatus" , true)
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#NextImg").innerHTML).toBe("See Next"))
        fireEvent.click(con.container.querySelector("#NextImg"))
        await waitFor(()=>expect(con.container.querySelector("#FailCall_con")).toBeInTheDocument())
        await waitFor(()=>expect(con.container.querySelector("#NextImg")).not.toBeInTheDocument())

    })
})



describe("user get into a favorite page " , ()=>{


    test("user come into fav page and fav list show up" ,async  ()=>{
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Fav_list")).toBeInTheDocument())
        
    })


    test("if localStorage is empty render empty con" ,async  ()=>{
        localStorage.removeItem("favImgs")
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector("#Empty_con")).toBeInTheDocument())
        
        
    })

    test("if localStorage is not empty render cards " ,async  ()=>{
        localStorage.setItem("favImgs" , "[\"https://cataas.com/cat/6167c4e8412a9f0018729ee0\"]")
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        await waitFor(()=>expect(con.container.querySelector(".Fav_card")).toBeInTheDocument())
        
        
    })


    test("when user click on the img pop up an image on screen" ,async  ()=>{
        localStorage.setItem("favImgs" , "[\"https://cataas.com/cat/6167c4e8412a9f0018729ee0\"]")
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        fireEvent.click(con.container.querySelector(".Fav_card"))
        await waitFor(()=>expect(con.container.querySelector(".Fav_card_img")).toBeInTheDocument())
        
        
        
    })

    test("when popup image show up user can remove it by click on the exit btn" ,async  ()=>{
        localStorage.setItem("favImgs" , "[\"https://cataas.com/cat/6167c4e8412a9f0018729ee0\"]")
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        fireEvent.click(con.container.querySelector(".Fav_card_img"))
        await waitFor(()=>expect(con.container.querySelector("#Popup_con")).toBeInTheDocument())
        fireEvent.click(con.container.querySelector("#ClosePopup"))
        await waitFor(()=>expect(con.container.querySelector("#Popup_con")).not.toBeInTheDocument())        
    })

    test("in fav list when click on the button remove image of the localStorage" ,async  ()=>{
        localStorage.setItem("favImgs" , "[\"https://cataas.com/cat/6167c4e8412a9f0018729ee0\"]")
        let con
        await waitFor(()=>con = render(<MemoryRouter initialEntries={["/fav"]}><App/></MemoryRouter>))
        expect(JSON.parse(localStorage.getItem("favImgs")).length).toBe(1) //before remove
        fireEvent.click(con.container.querySelector(".Fav_remove_item"))
        expect(JSON.parse(localStorage.getItem("favImgs")).length).toBe(0) //after remove
    })

})