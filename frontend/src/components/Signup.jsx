import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card"
  import axios from "axios"
import BeatLoader from "react-spinners/BeatLoader"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import * as yup from "yup"
import { useNavigate, useSearchParams } from "react-router-dom"
const Signup=()=>{
  localStorage.removeItem("user")
  const navgate=useNavigate()
  const [serc]=useSearchParams()
  const link=serc.get("createNew")
    const [loder,setloder]=useState(0)
    const [formdata,setformdata]=useState({
      username:"",
      passward:""
    })
    const inputchabge=(e)=>{
      const {name,value} =e.target;
      setformdata((prevState)=>({
        ...prevState,
        [name]:value
      }))

    }
    const handlelogic= async()=>{
      setloder(1)
      try{
      const sche=yup.object().shape({
       username:yup.string().email().required(),
       passward:yup.string().min( 6).required()
      })
      await sche.validate(formdata,{abortEarly:false})
       setloder(1)
     axios.post("http://localhost:3000/signup",
       formdata
     ).then((response) => {
       if(response.data.msg=="user already exist"){
        alert("user already exist")
        setloder(0)
       }
       else{
        
        localStorage.setItem("user",response.data.userexist2._id)
       navgate(`/das?${link ? `createNew=${link}`:""}`)
        setloder(0)
      }
      })
    }
    catch(e){
    alert("please write valid email and passward")
    setloder(0)
    }
   } 
    return( 
    <><Card>
    <CardHeader>
      <CardTitle>signup</CardTitle>
      <CardDescription>create your new account</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
     <div className="space-y-2"><Input name="username" placeholder="enter your email" onChange={inputchabge}></Input>
     {}
     </div>
    </CardContent> <CardContent className="space-y-2">
     <div className="space-y-2"><Input name="passward" placeholder="enter your passward"  onChange={inputchabge}></Input></div>
    </CardContent>
    <CardFooter>
     <Button onClick={handlelogic}>{loder ?<BeatLoader size={10} color="#36d7b7"></BeatLoader>:"signup"}</Button>
    </CardFooter>
  </Card>
  </>
    )
}
export default Signup