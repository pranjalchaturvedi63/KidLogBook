import nodeMailer from "nodemailer";
const mailer = function (email, callback) {
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "<email_id>",
      pass: "<password>",
    },
  });
  const mailOption = {
    from: "<email_id>",
    to: email,
    subject: "Its a Registration Link for Teacher",
    html: `Hello ${email}, This mail is regarding registration link which is given below. You must needs to click on the below link to Register yourself.<br><br>
        
        <form action="http://localhost:3000/teacher/teacherRegistration" method="">
            <input type="hidden" name="email" id='email' value='${email}'>
            <button>Click to Register </button>
        </form>
        `,
  };
  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("Error while sending mail from mailer", error);
      callback(false);
    } else {
      console.log("Mail sent from mailer");
      callback(info);
    }
  });
};

export default {mailer:mailer};
