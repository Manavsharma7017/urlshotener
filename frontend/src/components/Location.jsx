

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const Location=({clickdata})=>{
    const citycount=clickdata.reduce((acc,item)=>{
        if(acc[item.city]){
            acc[item.city]+=1
        }
        else{
            acc[item.city]=1
        }
        return acc
    },{})
    const cities=Object.entries(citycount).map(([city,count])=>({
        city,
        count,
}))

return(
   <div style={{width:"100%",height:300}}>
    <ResponsiveContainer>
    <LineChart width={700} height={300} data={cities}>
       <XAxis dataKey="city"></XAxis>
       <YAxis></YAxis>
       <Tooltip labelStyle={{color:"green"}}></Tooltip>
       <Legend></Legend>
       <Line type="monotone" dataKey="count" stroke="#8884d8"></Line>
    </LineChart>
    </ResponsiveContainer>
   </div>
)
}
export default Location