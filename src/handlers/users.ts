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

const createHandler = async (req:Request,res:Response)=> {
    try
    {
        if(req.body.password == undefined || req.body.first_name == undefined)
        {
            return res.json("first name and password are required");
        }
        const user_store = new UserStore();
        console.log("create handler used");
        const u:User = {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        };
        // until this point the password is not hashed yet
        const salt:(string | any) = process.env.PASS_SALT;
        const saltRound:number = parseInt(salt);
        const pepper:(string | any) = process.env.PASS_PEPPER;
        const hashed_password:string = bcrypt.hashSync(u.password + pepper , saltRound);
        u.password = hashed_password;
        // now the password is hashed
        const result = await user_store.create(u);
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handlers - users-create - error");
        console.log(err);
    }
};

const showHandler = async(req:Request,res:Response):Promise<void>=>{
    try
    {
        const user_store:UserStore = new UserStore();
        const id:number = parseInt(req.params.id);
        const result = await user_store.show(id);
        res.json(result).status(200);
    }
    catch(err)
    {
        console.log("handlers - users - error");
        res.json(err);
    }
};

const logInHandler = async(req:Request , res:Response)=>{
    try
    {
        const id:number = parseInt(req.body.id);
        let password:string = req.body.password;
        const pepper:any = process.env.PASS_PEPPER;
        password += pepper;
        // now the user inputs is ready
        const user_store = new UserStore();
        const userRealData = await user_store.show(id);
        const userRealPassword:string = userRealData["password"];
        const validLogIn:boolean = bcrypt.compareSync(password,userRealPassword);
        if(validLogIn) // valid login with the correct password
        {
            const key:any = process.env.JWT_KEY;
            const token = jwt.sign({
                user_id: userRealData.id,
                user_first_name : userRealData.first_name,
                user_last_name: userRealData.last_name
            },key);
            // how to save token in user data
            return res.cookie("token" , token).send("logged in").status(200);
        }
        else
        {
            res.json("Wrong password").status(200);
        }
    }
    catch(err)
    {
        res.json("Invalid data!");
    }
    //console.log(validLogIn);
    
};


// this middleware will be used in other handlers and services
export const authenticationMiddleWare = async(req:Request,res:Response,next:Function)=>
{
    try
    {
        const token = req.cookies.token;
        const key:any = process.env.JWT_KEY;
        const verify = jwt.verify(token,key);
        next();
    }
    catch(err)
    {
        res.send("You don't have the authority to come here");
    }
}

const logOutHandler = (req:Request , res:Response)=>{
    res.clearCookie("token").send("Logged out !");
};

const usersHandler = async(app:express.Application)=>{
    app.get("/users/mytoken",(req:Request,res:Response)=>{res.send(req.cookies.token)});
    app.get("/users/index",authenticationMiddleWare,indexHandler);
    app.get("/users/show/:id",showHandler);
    app.post("/users/create" , createHandler);
    app.post("/users/login",logInHandler);
    app.get("/users/logout",logOutHandler);
};

export default usersHandler;