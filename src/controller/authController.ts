import { Request, Response, NextFunction } from "express";

const handleLogin = (req: Request, res: Response, next: NextFunction)=>{
    res.send('Login com Google');
}

const handleRedirect = (req: Request, res: Response, next: NextFunction)=>{
    res.send('ok');
}



export default {handleLogin, handleRedirect}