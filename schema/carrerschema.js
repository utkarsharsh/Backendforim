import mongoose  from 'mongoose'

const usercareer = new mongoose.Schema({
    name:String,
    email:String,
    position:String,
    phone:String,
    resume:String
},{
    timestamps:true
});
export default mongoose.model("usercareer", usercareer);