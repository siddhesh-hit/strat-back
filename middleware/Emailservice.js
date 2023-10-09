const nodemailer=require('nodemailer')
const EmailService=(email,data)=>{
   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dev@handsintechnology.com',
          pass: 'Hitdev@2022'
        }
      });
      
      var mailOptions = {
        from: 'dev@handsintechnology.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text:data
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log({error});
        } else {
          console.log('Email sent:' + info.response);
        }
      });
}

module.exports=EmailService