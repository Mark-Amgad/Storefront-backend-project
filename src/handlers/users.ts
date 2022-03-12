import express,{ Request, Response } from "express";
import { User , UserStore } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const logInHandler = async(req:Request , res:Response)=>{
    const id:number = parseInt(req.params.id);
    let password:string = req.params.password;
    const pepper:any = process.env.PASS_PEPPER;
    password += pepper;
    // now the user inputs is ready
    const user_store = new UserStore();
    const userRealData = await user_store.show(id);
    const userRealPassword:string = userRealData["password"];
    const validLogIn:boolean = bcrypt.compareSync(password,userRealPassword);
    console.log(validLogIn);
    if(validLogIn)
    {
        // create a token
        // add this created token to the body
        // create new handlermethod(authentication) to check on the token
        // use the handler method as a middlware
        res.send("Successfully logged");
    }
    else
    {
        res.send("Wrong password");
    }
};

const usersHandler = (app:express.Application)=>{
    app.get("/users/index",indexHandler);
    app.get("/users/show/:id",showHandler);
    app.post("/users/create/:first_name/:last_name/:password" , createHandler);
    app.get("/users/login/:id/:password",logInHandler);
};

export default usersHandler;