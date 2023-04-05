import {Router} from 'express'
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asynceHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount>0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
})
)


router.post("/login",asynceHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email, password});
    
       if(user) {
        res.send(generateTokenResponse(user));
       }
       else{
        const BAD_REQUEST = 400;
         res.status(BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ))

const generateTokenResponse = (user: User)=>{
    const token = jwt.sign({
       userid:user.userid, email:user.email, RoleAdmin: user.RoleAdmin
    },"chiu",{
        expiresIn:"30d"
    });

    return{
        userid:user.userid,
        email:user.email,
        username:user.username,
        address:user.address,
        RoleAdmin:user.RoleAdmin,
        token: token
    };
}

export default router;