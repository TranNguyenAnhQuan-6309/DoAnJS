import { Schema, model } from "mongoose";

export interface User{
    userid:string;
    email:string;
    username:string;
    password:string;
    address:string;
    RoleAdmin:boolean;
}

export const UserSchema = new Schema<User>(
    {
        email:{type: String, required:true, unique: true},
        username:{type: String, required:true},
        password:{type: String, required:true},
        address:{type: String, required:true},
        RoleAdmin:{type: Boolean, required:true},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
)

export const UserModel = model<User>('user', UserSchema);