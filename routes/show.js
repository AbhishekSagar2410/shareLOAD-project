
const router = require('express').Router();
const Shareloadcollection = require('../models/filemodel');


router.get('/:uuid',async (req,res)=>{
    
    try {
        const file=await Shareloadcollection.findOne({uuid :req.params.uuid})
        // console.log(file);

        if(!file){
            return res.render('downloads' ,{error:'Link has been expired'});
        }
        return res.render('downloads' , {
            
            uuid:file.uuid,
            fileName: file.filename,
            filesize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/downloads/${file.uuid}`
        })

    } catch (error) {
        console.log('File not fetched')
        return res.render('downloads' ,{error:'Something went wrong'})
    }
})


module.exports=router;