const router = require('express').Router();
const path = require('path');
const Shareloadcollection = require('../models/filemodel');

router.get('/:uuid',async (req,res)=>{
    const file=await Shareloadcollection.findOne({uuid :req.params.uuid})
    if(!file){
        return res.render('downloads' ,{error:'Link has been expired'});
    }
    const filePath= path.join(__dirname,`./${file.path}`);
    console.log(filePath);
    res.download(filePath);
})


module.exports=router