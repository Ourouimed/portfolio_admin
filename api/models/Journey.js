import { model, Schema } from "mongoose";

const journeySchema = Schema({
    title : {type : String , required : true} ,
    org: String ,
    start_date : {type : String , required : true} ,
    end_date : {type : String , required : true} ,
    type : {type : String , required : true , enum : ['work' , 'education'] , default : 'education'} ,
    location:String ,
    description : String ,
    org_link : String 
} , {timestamps : true})


export default model("journeys" , journeySchema)