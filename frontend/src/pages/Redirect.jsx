import { dashatom } from "@/atoms/atom"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"

const Redirect=()=>{
    const shorturl=useParams()
    const devicearr=["laptop","moblie","pc","desktop"]
    const cityarr=["Tokyo","Delhi","Shanghai","Dhaka"]
    const deviceramdom=Math.floor(Math.random()*devicearr.length)
    const cityramdom=Math.floor(Math.random()*cityarr.length)

    try{
    axios.post("http://localhost:3000/click",{
        shorturl:shorturl.id,
        city:cityarr[cityramdom],
        divice:devicearr[deviceramdom]
    }).then((res)=>{
       if(res.data.msg=="i am fucking not ok"){
        alert("url is not vaild")
       }
       if(res.data.msg=="i am fucking ok"){
          axios.post("http://localhost:3000/reference",{
        shorturl:shorturl.id
    }).then((res)=>{
     if(res.data.msg=="url not exist"){
        alert("url not exist")
     }
     else{
    
        window.location.href=res.data.oringalurl
    }
    })
       }
    })
  
}catch(e){
    alert("wrong url")
}
   
    return (
        <div className="flex justify-center">
        
        </div>
    )
}
export default Redirect