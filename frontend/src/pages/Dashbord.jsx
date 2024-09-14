import { dashatom } from "@/atoms/atom"
import Createurl from "@/components/Createurl"
import Dashlinker from "@/components/Dashlinker"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { Filter } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

const Dashbord=()=>{
   const navigate=useNavigate()
    const [searchquery,setsearchqueary]=useState("")
    const [userdata,setuserdata]=useState([])
    const userid=localStorage.getItem("user")
    const count=useRecoilValue(dashatom)
    function datafuncton(response){
        if(response.data.msg=="you donot have acess"){
            navigate("/")
        }
        else{
        setuserdata(response.data.urldata)
        }
    }
    const totalclckarr=userdata.map((data)=>{
       return data.clickdata.length
    })
    let totalclck=0;
    for(let o=0;o<totalclckarr.length;o++){
        totalclck+=totalclckarr[o]
    }
    useMemo(async ()=>{
      const response= await axios.post("http://localhost:3000/geturl",{userid})
       datafuncton(response)
    },[count])


    const Filte=userdata.map((data)=>{
      return data.title
    })
    const Filtered=Filte.filter((data)=>{
        return data.includes(searchquery.toLowerCase())
    })
    return (
        <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                 <CardTitle>links created</CardTitle>
                </CardHeader>
                <CardContent>
                    {userdata.length}
                </CardContent>
         </Card>
         <Card>
                <CardHeader>
                <CardTitle>Total click</CardTitle>
                </CardHeader>
                <CardContent>
               {totalclck}
                </CardContent>
         </Card>
        </div >
        <div className="flex justify-between" >
        <h1 className="text-4xl font-extrabold">My links</h1>
        <Button><Createurl></Createurl></Button>
        </div>
        <div className="relative">
        <Input onChange={(e)=>{
             setsearchqueary(e.target.value)
        }}></Input>
        <Filter className="absolute top-2 right-2 p-1"></Filter>
        </div >
        <div >{(Filtered).map((d,i)=>{
            return(<div key={i}><Dashlinker usertitle={d} userdata={userdata}></Dashlinker></div>)
        })}</div>
        </div>
    )}
    
export default Dashbord