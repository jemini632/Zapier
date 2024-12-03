import { Router } from "express";
import {authMiddleware} from "../middleware";
import {SignupSchema , SigninSchema} from "../types"
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../db";
import type {Request, Response} from 'express';
import {Jwt} from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
declare var require: any

const router = Router();

router.post("/signup" , async (req,res) => {
   const username =req.body.username;
   const parsedData = SignupSchema.safeParse(body);


   if(!parsedData.success){
      return res.status(402).json({
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
   })


})

router.post("/signin",async (req,res)=> {
    const username =req.body.username;
   const parsedData = SigninSchema.safeParse(body);


   if(!parsedData.success){
      return res.status(411).json({
        message: "Incorrects Inputs"
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

   res.json({
    toke: token,
   });
})

router.get("/user",authMiddleware ,(req,res) => {
    console.log("signup here");
})

export const userRouter=router;
