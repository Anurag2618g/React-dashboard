import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = async(to, subject, text) => {
    const Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });

    await Transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
    });
}