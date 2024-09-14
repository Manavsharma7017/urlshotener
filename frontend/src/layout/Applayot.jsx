import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
const AppLayout=()=>{
    return (
        <div>
            <main className="min-h-screen container">
                <Header></Header>
                <Outlet></Outlet>
                {}
            </main>
            <div className=" p-10 text-center bg-gray-800 mt-10 text-black hover:text-white">
               Made and mannage by team B1N4RY
            </div>
        </div>
    )
}
export default AppLayout