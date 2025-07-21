import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/schemas.js';
import { Response_Msg } from '../constants/response.js';
import { Register_Validation, Login_validation } from '../models/validations.js';

const router = express.Router();

router.get('/list', async(req, res) => {
    try {
        const list = await User.find({}, {password: 0});
        res.status(200).json({message: Response_Msg.User_Fetched, data: list});
    }
    catch (err) {
        res.status(404).json({message: Response_Msg.User_Not_Found, error: err});
    }
});

router.post('/register', async(req, res) => {
    const {error, value} = Register_Validation.validate(req.body);

    if (error) {
        return res.status(500).json({message: Response_Msg.Error, error: error});
    }
    const alreadyExist = await User.findOne({email: value.email});
    if (alreadyExist) return res.json({message: Response_Msg.Already});

    try{
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const newUser = new User({...value, password: hashedPassword});
        const saved = await newUser.save();
        res.status(200).json({message: Response_Msg.User_Created, data: saved});
    }
    catch(err) {
        res.status(500).json({message: Response_Msg.Error, error: err});
    }
});

router.post('/login', async(req, res) => {
    const {error, value} = Login_validation.validate(req.body);

    if (error) {
        return res.status(500).json({message: Response_Msg.Error, error: error});
    }
    const registeredUser = await User.findOne({email: value.email});

    if (registeredUser) {
        try {
            if (bcrypt.compareSync(value.password, registeredUser.password)) {
                res.status(200).json({message: Response_Msg.LoggedIn, data: registeredUser});
            }
            else {
                res.status(500).json({message: Response_Msg.Failed, data: value});
            }
        }
        catch (err) {
            res.status(500).json({message: Response_Msg.Failed, error: err});
        }
    }
    else {
        res.status(404).json({message: Response_Msg.User_Not_Found});
    }
});

export default router;