import express from 'express';

import cors from 'cors';
import connect from './connectDatabase.js';
import userRoute from './Routes/userRoute.js';
import reciepieRoute from './Routes/reciepiesRoute.js';
const app = express();

connect();

app.use(cors());
app.use(express.json());

app.use('/auth',userRoute);
app.use('/reciepie',reciepieRoute);


app.listen(3001,()=>{
    console.log("server on 3001");
})

