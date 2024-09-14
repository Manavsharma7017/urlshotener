const mongoose=require("mongoose");
const { boolean, string } = require("zod");
mongoose.connect('mongodb+srv://manav:Manav%400603@cluster0.svddq7z.mongodb.net/urlshotner');
const userschema=new mongoose.Schema({
    username:String,
    passward:String,
    userdata:[{type: mongoose.Schema.Types.ObjectId,
        ref:`url`}],
})
const urlschema= new mongoose.Schema({ 
    oringalurl:String,
    shorturl:String,
    customurl:String,
    title:String,
    qr:String,
    clickdata:[{type: mongoose.Schema.Types.ObjectId,
        ref:`clickn`}],
})
const clicknschema=new mongoose.Schema({
     city:String,
     divice:String
})
const user=mongoose.model("user",userschema);
const url=mongoose.model("url",urlschema);

const clickn=mongoose.model("clickn",clicknschema)
module.exports={
    user,
    url,
    clickn
};