import { model, Schema } from "mongoose";

const projectSchema = Schema({
    name : {type : String , required: true} ,
    description : {type : String , required: true} , 
    tech : [] ,
    source : String ,
    preview : String ,
    image : {type : String , required: true} , 
} , {timestamps : true})

export default model("projects" , projectSchema)