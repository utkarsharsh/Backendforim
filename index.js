import express  from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userdetails from "./schema/contactschema.js";
import {upload} from "./config/multer.js"
import transporter from "./config/nodemailer.js"
import usercareer from "./schema/carrerschema.js"
import cloudinary from './config/cloudinary.js'
const app=express()
app.use(cors());
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
dotenv.config()

 const connectDB=async()=>{
    console.log("try one");
    try {
        const conn=await mongoose.connect(process.env.mongourl,{
        })
        console.log('MongoDB connected',conn.connection.host)
    } catch (err) {
        console.log('Error:',err.message)
        process.exit(1);
    }
}
connectDB();


app.post("/eeslc/contact",async (req,res)=>{
    const {name,email,comment,phone}=req.body;
    console.log(req.body);
    if(name && email && comment && phone){
    const user=new userdetails({
        name,email,comment,phone
    })
    await user.save();
   
    res.send("detailrecorded");
}
else res.status(404).send("Fill detail properly");
});

app.post("/eeslc/carrer",upload.single("resume"),async (req,res)=>{
    const {name,email,position,phone}=req.body;
   
    const resume=req.file.filename;
  const result= await  cloudinary.uploader.upload("./Upload/"+resume,
  { pages:true}, 
    );
    
    
    if(name && email && position && phone){
    const user=new usercareer ({
        name,email,position,phone,resume:result.url    });
    await user.save();
    const info = await transporter.sendMail({
        from: "harshupadhyay7786@gmail.com", 
        to: email, 
        subject: "testing", 
        text: "Hello,thanks for posting your resume", 
        html: "", 
      });
      console.log("Message sent: %s", info.messageId);
    res.send("detailrecorded");
}
else res.status(404).send("Fill detail properly");
})

app.listen(3000,()=>{
    console.log("listening");
});