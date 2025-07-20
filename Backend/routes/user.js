import express from 'express';
import User from '../models/schemas.js';
import { Response_Msg } from '../constants/response.js';
import { User_validation } from '../constants/validations.js';

const router = express.Router();

router.get('/', async(req, res) => {
    const list = await User.find();
    res.status(201).json({message: Response_Msg.User_Fetched, data: list});
});

router.post('/', async(req, res) => {
    const {error, value} = User_validation.validate(req.body);

    if (error) {
        return res.status(500).json({message: Response_Msg.Error, error: error});
    }
    const users = new User(value);
    const saved = await users.save();
    res.status(201).json({message: Response_Msg.User_Created, data: saved});
});

router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.status(201).json({message: Response_Msg.User_Fetched, data: user});
});

export default router;