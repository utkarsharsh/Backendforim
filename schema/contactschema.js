import mongoose  from 'mongoose'

const userdetail = new mongoose.Schema({
    name:String,
    email:String,
    comment:String,
    phone:String
},{
    timestamps:true
})
const userdetails= mongoose.model("userdetails", userdetail);
export default userdetails