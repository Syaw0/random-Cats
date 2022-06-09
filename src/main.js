import React from "react"
import { createRoot } from "react-dom/client"
import "./App/styles/index.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App/App"
const root = createRoot(document.getElementById("root"))
root.render(<BrowserRouter><App/></BrowserRouter>)