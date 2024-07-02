import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Middleware de autenticação do Google
const googleAuthGuard = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.force-ssl'] })(req, res, next);
};

const googleAuthRedirect = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
};

export { googleAuthGuard, googleAuthRedirect };