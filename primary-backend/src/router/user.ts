import { Router } from "express";
import {authMiddleware} from "../middleware";
import {SignupSchema , SigninSchema} from "../types"
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../db";
import { Express, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import request from "request";
import { ZodString } from "zod";

const router = Router();

router.post("/signup" , async (req: Request, res: Response)=> {
   const body =req.body;
   console.log(req.body);
   console.log(req.body);

   const parsedData = SignupSchema.safeParse(body);


   if(!parsedData.success){
      console.log(parsedData.error)
      return  res.status(402).json({
        message: "Incorrects Inputs"
      })
      
   }

   const userExists=await prismaClient.user.findFirst({
    where:{
        email: parsedData.data.username
    }
   })

   if(userExists){
    res.status(402).json({
        message: "User already exits"
    })
   }
   
   await prismaClient.user.create({
    data:{
         email: parsedData.data.username,
         password: parsedData.data.password,
         name: parsedData.data.name
    }
   })

    return res.json({
       message: "Please verify your account"
   });
   


})

router.post("/signin",async (req,res)=> {
    const body =req.body;
   const parsedData = SigninSchema.safeParse(body);


   if(!parsedData.success){
       return  res.status(411).json({
        message: "Incorrect Inputs"
      })
      
   }
   
  
   const user= await prismaClient.user.findFirst({
    where:{
        email: parsedData.data.username,
        password: parsedData.data.password
    }
   })

   if(!user){
      return res.status(403).json({
        message: "Invalid credentials"
    })
   }

   const token = jwt.sign({
    id: user.id
   },JWT_PASSWORD)

   return res.json({
    token: token,
   });
})

router.get("/",authMiddleware,async (req,res)=> {
   
    
    // @ts-ignore
    const id =req.id;
    const user = await prismaClient.user.findFirst({
      where:{
        id
      },
      select:{
        name: true ,
        email: true
      }
    })

    return res.json({
      user
    });
})

export const userRouter=router;
