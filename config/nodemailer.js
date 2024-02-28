import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'harshupadhyay7786@gmail.com' ,
        pass: 'xwcl uuda hobw nxnp'
    }
});
export default transporter