import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layout/Applayot"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Dashbord from "./pages/Dashbord"
import Link from "./pages/Link"
import Redirect from "./pages/Redirect"
import { RecoilRoot } from "recoil"
const router=createBrowserRouter([
    {
        element:<AppLayout></AppLayout>,
        children:[{
            path:"/",
            element:<Landing></Landing>
        },{
            path:"/auth",
            element:<Auth></Auth>
        },{
            path:"/das",
            element:<Dashbord></Dashbord>
        },{
            path:"/link/:id",
            element:<Link></Link>
        },{
            path:"/:id",
            element:<Redirect></Redirect>
        }]
    }
])

function App() {
 return <RecoilRoot> <RouterProvider router={router}></RouterProvider></RecoilRoot>

}

export default App
