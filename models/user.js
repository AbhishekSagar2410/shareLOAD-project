
const mongoose=require('mongoose');
// let fileSchema = new mongoose.Schema({
let fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    
    size:{
        type:Number ,
        required:true
    },
    uuid:{
        type:String ,
        required:true
    },
    sender:{
        type:String ,
        required:false
    },
    receiver:{
        type:String ,
        required:false
    }
});

const Shareloadcollection = mongoose.model('Shareloadcollection',fileSchema)
module.exports= Shareloadcollection;

