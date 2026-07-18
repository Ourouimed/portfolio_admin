import { model, Schema } from "mongoose";

const UserSchema = Schema.create({
    name : { type : String , required : true} ,
    email : { type : String , required : true} ,
    password : { type : String , required : true} ,
} , {timestamps : true})


export default model('users' , UserSchema)