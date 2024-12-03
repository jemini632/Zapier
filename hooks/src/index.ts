import express from "express"
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();



const app =express();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId",async (req,res)=>{
    const userId= req.params.userId;
    const zapId= req.params.zapId;
    const body=req.body;
    console.log("reached 1")

    await client.$transaction(async tx =>{
         const run = await client.zapRun.create({
            data:{
                zapId: zapId,
                metadata: body
            }
         });
              console.log("reacherd2")
         await client.zapRunOutBox.create({
            data:{
                zapRunId: run.id
            }
         })
    })

   res.json({
    message: "webhook received"
   })
})

app.listen(3000);