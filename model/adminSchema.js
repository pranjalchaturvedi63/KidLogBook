import mongoose from "mongoose";

const adminSchma=mongoose.Schema({
    email:{
        type:String,
        required : true
    }, 
    password:{
        type:String,
        required:true
    }
});

export default mongoose.model('adminSchma',adminSchma,'admin');
