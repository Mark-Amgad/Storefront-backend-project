import express,{ Request, Response } from "express";
import { User , UserStore } from "../models/user";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();



const indexHandler = async(req:Request , res:Response):Promise<void>=>{
    try
    {
        const user_store = new UserStore();
        const result = await user_store.index();
        res.json(result);
    }
    catch(err)
    {
        console.log("handler - users - error");
        res.json(err);
    }

};

const createHandler = async (req:Request,res:Response):Promise<void> => {
    try
    {
        const user_store = new UserStore();
        const u:User = {
            first_name:req.params.first_name,
            last_name:req.params.last_name,
            password:req.params.password
        };
        // until this point the password is not hashed yet
        const salt:(string | any) = process.env.PASS_SALT;
        const saltRound:number = parseInt(salt);
        const pepper:(string | any) = process.env.PASS_PEPPER;
        const hashed_password:string = bcrypt.hashSync(u.password + pepper , saltRound);
        u.password = hashed_password;
        // now the password is hashed
        const result = await user_store.create(u);
        res.json(result);
    }
    catch(err)
    {
        console.log("handlers - users - error");
        res.json(err);
    }
};

const showHandler = async(req:Request,res:Response):Promise<void>=>{
    try
    {
        const user_store:UserStore = new UserStore();
        const id:number = parseInt(req.params.id);
        const result = await user_store.show(id);
        res.json(result);
    }
    catch(err)
    {
        console.log("handlers - users - error");
        res.json(err);
    }
};

const userHandler = (app:express.Application)=>{
    app.get("/user/index",indexHandler);
    app.get("/user/show/:id",showHandler);
    app.post("/user/create/:first_name/:last_name/:password" , createHandler);
};

export default userHandler;