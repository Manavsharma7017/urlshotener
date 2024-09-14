import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuItem } from "./ui/dropdown-menu"
import { LinkIcon, LogOut } from "lucide-react"
const Header=()=>{
  
  let u=false
if(localStorage.getItem("user")){
   u=true;

}else{
  u=false
}
    const navigate=useNavigate()
  
    return (
        <nav className="py-4 flex justify-between item-center"> <Link to="/">
        <img src="/urlshortnerlogo.png" className="h-16" alt="short"></img>
        </Link>
       {!u?
        <Button onClick={()=>{
            navigate("/auth")
        }} >Login</Button>:(
            <DropdownMenu className="w-10 rounded-full overflow-hidden">
  <DropdownMenuTrigger>☰</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><LinkIcon className="mr-2 h-4 w-4"></LinkIcon><span><Link to="/das">My link</Link></span></DropdownMenuItem>
    <DropdownMenuItem><LogOut className="mr-2 h-4 w-4"></LogOut><span onClick={()=>{
       localStorage.removeItem("user")
       navigate("/")
    }}>Logout</span></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        )}
      </nav>
    )
}
export default Header