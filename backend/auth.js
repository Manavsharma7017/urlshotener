const { user,url, clickn}=require("./schema")
const express=require("express");
const app=express();
app.use(express.json());
const cors=require("cors")
app.use(cors())

app.post("/signup",async (req,res)=>{
const username=req.body.username
const pass=req.body.passward

const userexist =await user.findOne({
    username,
    passward:pass
})
if(userexist){
    res.json({
        msg:"user already exist",
    })
}
else{
const signup= await user.create({
    username:username,
    passward:pass
})
const userexist2 =await user.findOne({
    username,
    passward:pass
})

res.json({
    msg:"done",
    userexist2
})
}
})


app.post("/login",async(req,res)=>{
    const username=req.body.username
    const pass=req.body.passward
    const userexist =await user.findOne({
        username,
    })
    const userexist2 =await user.findOne({
        username,
        passward:pass
    })
    if(userexist && userexist2){
        res.json({
            msg:"user exist",
           userexist2
        })
    }
    else if( !userexist||!userexist2){
        res.json({
            msg:"email or passward is incorrect",
            userexist2
        })
    }
   else{
    res.json({
      msg:"you need to signup first"
        })
    }
})
app.post("/dasdata",async (req,res)=>{
    const id=req.body.user
    const oringalurl=req.body.oringalurl
    const shorturl=Math.random().toString(36).substring(2,6)
    const customurl=req.body.customurl
    const title=req.body.title
    const qr=`https://short.in/${shorturl}`
    const createdurl =await url.create({
        oringalurl,
        shorturl,
        customurl,
        title,
        qr
    })
  
    await user.updateOne({
        _id:id
    }, {
        "$push": {
            userdata:createdurl._id
        }
    })

    res.json({
        createdurl
    })
})
app.post("/geturl",async(req,res)=>{
    const userid=req.body.userid
    const urlid=await user.findById(userid)
    try{
    const urldata=await url.find({
        _id:{
         "$in":urlid.userdata
        }
})
res.json({
    urldata
})}
catch(e){
    res.json({
        msg:"you donot have acess"
    })
}

})
//clcs dato
app.post("/click",async(req,res)=>{
    const shorturl=req.body.shorturl
    const city=req.body.city
    const divice=req.body.divice
     
    const urlfinsder=await url.findOne({
            shorturl
        })
    const customurl=await url.findOne({
        customurl:shorturl
    })
     if(urlfinsder){
   const clickid= await clickn.create({
        city,
        divice
    })
// short url will be3 unque to fnd n url
    await url.updateOne({
        shorturl
    },{
        "$push": {
            clickdata:clickid._id
        }
    })
    res.json({
        msg:"i am fucking ok"
    })}
    else if(customurl){
       const clickid= await clickn.create({
        city,
        divice
    })
// short url will be3 unque to fnd n url
    await url.updateOne({
        customurl:shorturl
    },{
        "$push": {
            clickdata:clickid._id
        }
    })
    res.json({
        msg:"i am fucking ok"
    })
    }else{
        res.json({
            msg:"i am fucking not ok"
        })
    }
}
)
app.post("/deleteurl",async(req,res)=>{
    const urls=req.body.urls
  try{const urlfind=await url.findById(urls)
      await clickn.deleteMany({
        _id:{
            "$in":urlfind.clickdata
           }
      })
      
    const delet=await url.findOneAndDelete({
        _id:urls
    })
    
    res.json({
        delet
    })} catch(e){
        res.json({e})
    }
})
app.post("/reference",async(req,res)=>{
    try{    const shorturl=req.body.shorturl
        const findedurl= await url.findOne({
              shorturl
          })
          if(findedurl){
          res.json({
              oringalurl:findedurl.oringalurl
          })}
          else{
              const findedurl= await url.findOne({
                  customurl:shorturl
              })
              res.json({
                  oringalurl:findedurl.oringalurl
              })
            }
        }catch(e){
            res.json({
                msg:"url not exist"
            })
        }

    }
)
app.post("/urldata",async(req,res)=>{
    const urlid=req.body.urlid
   try{  
    const findedurl=await url.findById(urlid)
  if(findedurl){
    const click= await clickn.find({
     _id:{
        "$in":findedurl.clickdata
     }
     }
    )
    res.json({
     findedurl,
     click
    })
    
    
 }
 else{
     res.json({
         msg:"don't"
     })
 }}catch(e){
    res.json({
        msg:"you dont belong here"
    })
 }
})

app.listen(3000);