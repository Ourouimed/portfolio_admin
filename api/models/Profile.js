import { model, Schema } from "mongoose";

const profileSchema = Schema({
    email : {type : String , required : true} ,
    instagram : {type : String , required : true} ,
    github : {type : String , required : true},
    linkedin : {type : String , required : true} ,
    whatsapp : {type : String , required : true} ,
    location : {type : String , required : true} ,
    resume : {type : String , required : true}
} , {timestampts : true })


export default model("profile" , profileSchema)