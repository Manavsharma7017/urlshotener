import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "react-router-dom"
const Landing=()=>{
  const [url,setutl]=useState("")
  const navigate=useNavigate()
    return (
        <div className="flex flex-col items-center">
          <h2 className="my-9 sm:my-15 text-2xl sm:text-5xl lg:text-6xl text-white text-center font-extrabold">The best in the west
            <br/>
            Try to make your url
            <div>Shorter</div>
            
          </h2>
          <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
            <Input type="url"
            placeholder="Enter your url"
            className="h-full flex-1 py-4 px-4"
            onChange={(e)=>{
              setutl(e.target.value)
            }}
            ></Input>
            <Button className="h-full" type="submit" variant="destructive"
            onClick={()=>{
             navigate("/auth?createNew="+url)
            }}>shorten!</Button>
          </form>
          <img src="urlbanner.jpeg" alt="sorry" className="w-full h-2/5 my-11 md:px-11 rounded-full"/>
          <Accordion type="multiple" collapsible className="w-full md:px-11">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it safe?</AccordionTrigger>
                <AccordionContent>
                  Yes. It is safe to use our website to shorten your url as we have a no log policy
               </AccordionContent>
               </AccordionItem> 
               <AccordionItem value="item-2">
              <AccordionTrigger>Is it free?</AccordionTrigger>
                <AccordionContent>
                  Yes. It is free for all
               </AccordionContent>
               </AccordionItem> 
               <AccordionItem value="item-3">
               <AccordionTrigger>who created this website</AccordionTrigger>
                <AccordionContent>
                  this website is created by team B1N4RY
               </AccordionContent>
               </AccordionItem> 
               <AccordionItem value="item-4">
               <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
               </AccordionContent>
               </AccordionItem> 

          </Accordion>

        </div>
    )
}
export default Landing