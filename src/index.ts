import {config} from 'dotenv';


config();

import express from "express";
import passport  from 'passport';
import authRoutes from './routes/auth';

require('./strategies/google');



async function bootstrap() {
    
    const app = express();
 
    const PORT = process.env.PORT;

    app.use(passport.initialize());
    


    app.use('/api/auth', authRoutes);
    

    try {
        app.listen(PORT, () => console.log(`Server escutando a porta: ${PORT}`));
       
    } catch (error) {
        console.log(error);
    }
}

bootstrap();