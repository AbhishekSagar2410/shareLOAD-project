const router=require('express').Router();
const Ratecollection = require('../models/rateusmodel');


router.get('/open' , async(req,res)=>{
    try {
        let countUser= await Ratecollection.countDocuments();
        console.log(countUser);

        return res.render('form',{
            countUser:countUser
        });
    } catch (err) {
        return res.json({error: "Something went wrong. Try again"})
        console.log(err);
    }
})

router.post('/check' ,async (req,res)=>{
    console.log(req.body);
    try {
        const {userName , email}=req.body;
        const findUser=await Ratecollection.findOne({email:email});
        let countUser= await Ratecollection.countDocuments();
        if(findUser)
        {
            
            return res.json({
                startMsg: "Oops ! ",
                nextMsg : "Email Already Registered",
                countUser:countUser
            });
            
        }
        const createUser=new Ratecollection({
            username:userName,
            email:email
        })

        let response= await createUser.save();
        countUser= await Ratecollection.countDocuments();
        console.log(countUser);
        return res.json({
            startMsg: "Great ! ",
            nextMsg : "Email Registered Successfully",
            countUser:countUser
        });
        
    } catch (error) {
        console.log('User not created')
        return res.json({
            startMsg: "Oops ! ",
            nextMsg : "Something went wrong",
            countUser:countUser
        })
        
    }
})

module.exports=router;