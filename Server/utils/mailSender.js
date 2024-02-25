const nodemailer=require("nodemailer")
require("dotenv").config();
exports.mailSender= async (email,body,title)=> {
    try {
        let mailTransporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        let info= await mailTransporter.sendMail({
            from:`StudyNotion || by - Aman`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        return info;


    }catch(e) {
        console.log("error in sending email")
    }
}