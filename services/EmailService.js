
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.sendEmail= function(options){
    let opt = {
        to: options.to,
        from: process.env.SENDER_EMAIL, // Use the email address or domain you verified above
        subject: options.subject,
        text: options.text,
        html: options.html,
      };
      //ES6
sgMail
.send(opt).then(
    response => {
        console.log(response);
    }
    ,
    error => {
        console.log(error);
    }
)
}


