import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/user.js';
import { Response_Msg } from './constants/response.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(Response_Msg.Connected);

        app.use('/api', router);

        app.listen(process.env.PORT || port, () => {
            console.log(`Server running at port:${process.env.PORT || port}`);
        }); 
    } 
    catch(err) {
        console.error(JSON.stringify({
            message: Response_Msg.Connection_Error,
            error: err.message
        }));
    }
})();