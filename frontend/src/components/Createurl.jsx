import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
    
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import * as yup from"yup"
import axios from "axios"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { dashatom } from "@/atoms/atom"

const Createurl=()=>{
  const [count ,setcount]=useRecoilState(dashatom)
const user=localStorage.getItem("user")
const navigate=useNavigate()
const [seacrhparam,setsearchparam]=useSearchParams()
const longlink=seacrhparam.get("createNew")
const [formdata,setformdata]=useState({
    title:"",
    longlink:longlink?longlink:"",
    custom:""
})

const schema=yup.object().shape({
    title:yup.string().required("Title is required"),
    longlink:yup.string().url("must be in url").required("Title is required"),
    custom:yup.string()
})
const handlechange=(e)=>{
    const {id,value} =e.target;
    setformdata((prevState)=>({
      ...prevState,
      [id]:value
    }))

  }
const createurl=async()=>{
  try{
    await schema.validate(formdata,{abortEarly:false})
   await axios.post("http://localhost:3000/dasdata",{
        user,
        oringalurl:formdata.longlink,
        customurl:formdata.custom,
        title:formdata.title,
    }).then((res)=>{
        alert("done")
    })
    
    setcount(count+1)
  }catch(e){
 alert("wrong information")
 
  }
}


return(<>
<Dialog defaultOpen={longlink}
onOpenChange={(r)=>{if(!r) setsearchparam({})}}>
  <DialogTrigger><Button >Create New Link</Button></DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="font-bold text-2xl">Create short url</DialogTitle>
         <Input id="title" placeholder="title" value={formdata.title} onChange={handlechange} ></Input>

         <Input id="longlink" placeholder="Long url" value={formdata.longlink} onChange={handlechange}></Input>
       
         <Input id="custom" placeholder="custom url(optional)" value={formdata.custom} onChange={handlechange}></Input>

    </DialogHeader>
    <DialogFooter className="sm:justify-start">  
            <Button type="button" variant="secondary" onClick={createurl}>
              Create
            </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>

</>)
}
export default Createurl