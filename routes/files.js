const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Shareloadcollection = require('../models/filemodel');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage:storage , limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
        const file = new Shareloadcollection({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        res.json({ file: `${process.env.APP_BASE_URL}/${response.uuid}` });
      });
});


//send download link to receiver email
router.post('/send' ,async (req,res)=>{
  const {uuid,emailTo, emailFrom} =req.body;

  //validate email
  if(!emailTo || !emailFrom || !uuid)
  {
    return res.status(422).send({error:"All fields are required"});
  }

  //get data from database
  const file=await Shareloadcollection.findOne({uuid :uuid})
  console.log(file);
  // if(file.sender){
  //   return res.status(422).send({error:"You already send the email"});
  // }

  file.sender=emailFrom;
  file.receiver=emailTo;
  const response=await file.save(); // save in database

  //send email
  // return res.json(response);

  const sendEmail=require('../services/emailservice');
  sendEmail({
    emailTo: emailTo,
    emailFrom:emailFrom,
    subject: 'shareLOAD file sharing',
    text: `${emailFrom} shared a file with you`,
    html: require('../services/emailTemplate')({
      emailFrom:file.sender,
      filesize: parseInt(file.size/1024),
      downloadLink: `${process.env.APP_BASE_URL}/${file.uuid}`
      
    })
  })

  return res.send({success:"Email sent"});
  


})

module.exports = router;