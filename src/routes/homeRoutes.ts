import { Router } from "express";
import postVideo from "../controller/homeController";

const routes = Router();

routes.get("/", (req, res)=>{
    return res.render('home');
});

routes.post("/postVideo", postVideo);


export default routes;