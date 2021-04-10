const nodemailer=require('nodemailer')
async function sendEmail({emailTo, emailFrom, subject, text ,html}){
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        // port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let info=await transporter.sendMail({
        to: emailTo,
        from: `ShareLOAD <${emailFrom}`,
        subject:subject,
        text:text,
        html:html
    })

    console.log(info);
}

module.exports=sendEmail;