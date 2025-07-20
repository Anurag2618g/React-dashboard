import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/user.js';
import { Response_Msg } from './constants/response.js';

dotenv.config();
const app = express();
app.use(express.json());
const port = 3000;

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(Response_Msg.Connected);

        app.use('/api', router);

        app.listen(port, () => {
            console.log(`App running at port:${port}`);
        }); 
    } 
    catch(err) {
        console.error(JSON.stringify({
            message: Response_Msg.Connection_Error,
            error: err.message
        }));
    }
})();