import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/auth/user",isUserAuthenticated,(req,res) => {
    if(req.user.id)
        res.json({user:req.user,complete:true});
    else
        res.json({user:req.user,complete:false});

})

export default router;