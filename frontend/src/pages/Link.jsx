import axios from "axios"
import { Link2Icon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/ui/button";
import { Copy, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Location from "@/components/Location";
import Device from "@/components/Device";
const Link=()=>{
    const navigate=useNavigate()
    const[clickdata,setclickdata]=useState([])
    const[urldata,seturldata]=useState([])
    const urlid=useParams()
    function datafuncton(response){
        if(response.data.msg=="you dont belong here"){
            navigate("/")
        }
        else{
          setclickdata(response.data.click)
          seturldata(response.data.findedurl)
          
        }
    }
    useEffect(()=>{axios.post("http://localhost:3000/urldata",{urlid:urlid.id}).then((res)=>{
        datafuncton(res)
        
    })},[])
    return (
      <>
        <div className="flex flex-col gap-8 sm:flex-row justify-between">
            <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
           <span className="text-6xl font-extrabold hover:underline cursor-pointer">{urldata.title}</span>
           <a href={`http://localhost:5173/${urldata.customurl?urldata.customurl:urldata.shorturl}`}
           target="_blank"
           className="text-3xl sm:text-4xl text-blue-400 font-blod hover:underline"
           >
           http://localhost:5173/{urldata.customurl?urldata.customurl:urldata.shorturl}
           </a>
        
           <a href={urldata.oringalurl} 
           className="flex items-center gap-1 hover:underline cursor-pointer">
             <Link2Icon></Link2Icon> 
             {urldata.oringalurl}
           </a> 
           <div> <Button variant="ghost"onClick={()=>{
         navigator.clipboard.writeText(`http://localhost:5173/${urldata.customurl?urldata.customurl:urldata.shorturl}`)
         alert("copy to clipbord")
      }}><Copy></Copy></Button>
    <Button variant="ghost"onClick={()=>{
        axios.post("http://localhost:3000/deleteurl",{urls:urldata._id}).then((res)=>{
                if(res.data.e){
                  alert("could not delete")
                }
                else{
                  alert("url deleted")
                  navigate("/das")
                }
             })
      }}><Trash ></Trash></Button>
      </div>
           </div>
         
             <Card className="sm:w-3/5">
         <CardHeader>
          <CardTitle className="text-4xl font-extrabold">stats</CardTitle>
              </CardHeader>
         {
          clickdata?.length?  <CardContent>
          <Card>
            <CardHeader>Total click</CardHeader>
            <CardContent><p>{clickdata.length}</p></CardContent>
            <CardHeader>Location</CardHeader>
            <CardContent><Location clickdata={clickdata}></Location></CardContent>
            <span><CardHeader>Device</CardHeader>
            <CardContent><Device clickdata={clickdata}></Device></CardContent></span>
          </Card>
        </CardContent>:  <CardContent>
              <p>no data</p>
            </CardContent>
        
         }
               </Card>
              
        </div>
    </>
    )
}
export default Link