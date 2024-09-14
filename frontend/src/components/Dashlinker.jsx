import QRCode from "react-qr-code";
import { json, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Trash } from "lucide-react";
import axios from "axios";
const Dashlinker=({usertitle,userdata})=>{
    
    const navigate=useNavigate()
    const urlvalue=userdata.map((data)=>{
     if(data.title===usertitle){
        return data._id
     }
    })
    const url=userdata.map((data)=>{
      if(data.title===usertitle){
         if(data.customurl){
            return data.customurl
         }
         else{
           return data.shorturl
         }
        
      }
     })
   const value=userdata.map((dat)=>{
      if(dat.title==usertitle){
          return JSON.stringify(dat.qr)
      }
     })
     
    const urloriginal=userdata.map((data)=>{
      if(data.title===usertitle){
         return data.oringalurl
      }
     })

     return(<>
     
     <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
            <QRCode
    size={2}
    style={{ height: "auto", maxWidth: "10%", width: "8%" }}
    value={value.join("")}
    viewBox={`0 0 2 2`}
    className="object-contain ring ring-blue-500 self-start"
    />
    <Link to={`/Link/${urlvalue.filter((value)=>{
          if(value!=undefined)
          return value})}`}>
    <span className="text-3xl font-extrabold hover:underline cursor-pointer">{usertitle}</span>
    <div className="text-2xl text-blue-400 font-extrabold hover:underline cursor-pointer">http://localhost:5173/{url}</div>
    <div className="text-2xl flex items-center gsp-1 hover:underline cursor-pointe">{urloriginal}
      </div>
    
    </Link>
    <div className="flex gap-2">
      <Button variant="ghost"onClick={()=>{
       
         navigator.clipboard.writeText(`http://localhost:5173/${url.filter((value)=>{
          if(value!=undefined)
          return value})}`)
        alert("url copied")
      }}><Copy></Copy></Button>
    <Button variant="ghost"onClick={()=>{
        axios.post("http://localhost:3000/deleteurl",{urls:urlvalue}).then((res)=>{
                if(res.data.e){
                  alert("could not delete")
                }
                else{
                  alert("url deleted")
                }
             })
        
      }}><Trash ></Trash></Button>
      
    </div>
      </div>
  
     
     </> )
}
export default Dashlinker