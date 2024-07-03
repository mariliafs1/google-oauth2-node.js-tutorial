import { Router } from "express";
import passport from "passport";
import authController from '../controller/authController'

const router = Router();

router.get('/google',passport.authenticate('google'), (req, res)=> res.send(200));

router.get('/google/login', authController.handleLogin);
router.get('/google/redirect', authController.handleRedirect);


export default router;