const express=require('express');
const app=express();
const dotenv=require('dotenv');  //for environmental variables
const mongoose = require('mongoose');
dotenv.config({path:'../private.env'})
const path = require('path');
const PORT= process.env.PORT || 3000;
var hbs = require('hbs') ;


//paths
let indexHtmlPath= path.join(__dirname,"../public/");
let templateViewsPath =path.join(__dirname,"../templates/views");
let templatePartialPath =path.join(__dirname,"../templates/partials")

//Connection build with database
mongoose.connect(process.env.MONGO_CONNECT_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("DB Connected successfully ");
  })
  .catch((err) => console.log(err.message));


  //template engine
  app.use(express.static(indexHtmlPath));
  app.set('view engine' , 'ejs')
  app.set('views', templateViewsPath);

//Routes file
app.use(express.json());

app.get('/',(req,res)=>{
  return res.render('index');
})
app.use('/api/files',require('../routes/files'));
app.use('' , require('../routes/show'))
app.use('/downloads' , require('../routes/downloadsRouteFile'))



//Listen port
app.listen(PORT, (e)=>{
    
    console.log(`Listening on port ${PORT}`);
})