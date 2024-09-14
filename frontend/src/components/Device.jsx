import{ Cell, PieChart, ResponsiveContainer,Pie } from "recharts"
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Device=({clickdata})=>{
    const divicecount=clickdata.reduce((acc,item)=>{
        if(acc[item.divice]){
            acc[item.divice]+=1
        }
        else{
            acc[item.divice]=1
        }
        return acc
    },{})
    const result=Object.entries(divicecount).map(([divice,count])=>({
        divice,
        count,
}))
return(
<div style={{width:"100%",height:300}}>
<ResponsiveContainer>
    <PieChart width={700} height={400} >
        <Pie
        data={result}
        dataKey="count"
        label={({divice,percent})=>`${divice}:${(percent*100).toFixed(0)}%`}
        > {result.map((_,index)=>(
            <Cell
            key={`cell-${index}`}
            fill={COLORS[index%COLORS.length]}>
            </Cell>
        ))}</Pie>
    </PieChart>
</ResponsiveContainer>
</div>
) 

}
export default Device