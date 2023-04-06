import {Router} from 'express'
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asynceHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

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
      const user = await UserModel.findOne({email});
    
       if(user && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenResponse(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ))

router.post('/register', asynceHandler(
    async (req,res) => {
        const {username, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send("User is already exist, please login!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser:User = {
            userid:'',
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            RoleAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user: User)=>{
    const token = jwt.sign({
       userid:user.userid, email:user.email, RoleAdmin: user.RoleAdmin
    },process.env.JWT_SECRET!,{
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