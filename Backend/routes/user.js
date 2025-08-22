import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/schemas.js';
import { sendMail } from '../utils.js';
import { Response_Msg } from '../../constants/response.js';
import { Register_Validation, Login_validation, Email_validation, NewPassword_validation } from '../models/validations.js';

const router = express.Router();

router.get('/list', async(req, res) => {
    try {
        const list = await User.find({}, {password: 0});
        res.status(200).json({message: Response_Msg.User_Fetched, data: list});
    }
    catch (err) {
        res.status(404).json({message: Response_Msg.User_Not_Found, error: err.message});
    }
});

router.post('/register', async(req, res) => {
    const {error, value} = Register_Validation.validate(req.body);

    if (error) {
        return res.status(400).json({message:{details: error.details}});
    }
    const alreadyExist = await User.findOne({email: value.email});
    if (alreadyExist) return res.status(409).json({message: Response_Msg.Already, data: value.email});

    try{
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const newUser = new User({...value, password: hashedPassword});
        const saved = await newUser.save();
        res.status(200).json({message: Response_Msg.User_Created, data: saved});
    }
    catch(err) {
        res.status(500).json({message: Response_Msg.Error, error: err.message});
    }
});

router.post('/login', async(req, res) => {
    const {error, value} = Login_validation.validate(req.body);
    if (error) {
        return res.status(400).json({message: {details: error.details}});
    }

    try {
        const registered = await User.findOne({email: value.email});
        const valid = registered && bcrypt.compareSync(value.password, registered.password);

        if (!valid) {
            return res.status(401).json({message: Response_Msg.Incorrect});
        }

        return res.status(200).json({message: Response_Msg.LoggedIn});
    }
    catch (err) {
        return res.status(500).json({message: Response_Msg.Error, error: err.message});
    }
});

router.post('/forgot', async(req, res) => {
    const {error, value} = Email_validation.validate(req.body);
    if (error) {
        return res.status(400).json({message: {details: error.details}});
    }

    try {
        const registered = await User.findOne({email: value.email});
        if (!registered) {
            return res.status(404).json({message: Response_Msg.User_Not_Found});
        }
        const token = crypto.randomBytes(32).toString('hex');
        registered.token = token;
        registered.tokenExpiry = Date.now() + 3600000;

        await registered.save();

        const link = `http://localhost:5173/reset/${token}`;

        await sendMail(value.email, 'Password reset link' , `Reset password ${link}`);

        return res.status(200).json({message: Response_Msg.resetLink});
    }
    catch (err) {
        return res.status(500).json({message: Response_Msg.Error, error: err.message});
    }
});

router.post('/reset/:token', async(req, res) => {
    const {error, value} = NewPassword_validation.validate(req.body);
    if (error) {
        return res.status(400).json({message: {details: error.details}});
    }
    const {token} = req.params;

    try {
        const user = await User.findOne({
            token: token,
            tokenExpiry: { $gt : Date.now()},
        });

        if (!user) {
            return res.status(400).json({message: Response_Msg.token});
        }
        const newPassword = await bcrypt.hash(value.password, 10);
        user.password = newPassword;
        user.token = undefined;
        user.tokenExpiry = undefined;
        
        await user.save();

        return res.status(200).json({message: Response_Msg.reset});
    }
    catch (err) {
        return res.status(500).json({message: Response_Msg.Error, error: err.message});
    }
});

export default router;