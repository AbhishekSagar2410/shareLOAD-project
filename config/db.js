// database password- 6u6pVbxj4O4XXsOx
//MONGO_CONNECT_URL= "mongodb+srv://ShareLOAD:6u6pVbxj4O4XXsOx@cluster0.syuvz.mongodb.net/shareLOAD?retryWrites=true&w=majority"

const dotenv=require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'../private.env'})

//database connection
async function connectDB() {
    
   await mongoose.createConnection(process.env.MONGO_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true, 
        useCreateIndex: true, useFindAndModify: true })
        .then(() => {
            console.log("Connection build successfully....")
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = connectDB; 