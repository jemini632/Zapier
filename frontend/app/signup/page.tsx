"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";


export  default function(){
    
    return <div>
        <Appbar/>
      <div className="flex justify-center">  
       <div className="flex pt-8 max-w-2xl">
         <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
               Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-4 pt-4">
                <CheckFeature label={"Easy setup, no coding required"} />
            </div>
            <div className="pb-6 ">
               <CheckFeature label={"Free forever for core features"} />
            </div>
            <div >
               <CheckFeature label={"14-day trial of premium features & apps"} />
            </div>
         </div>
         <div className="flex-1 pt-12 pb-12 mt-12  px-4 border-rounded">
             <Input label={"Name"} onChange={e=>{

             }} type="text" placeholder="your name"></Input>
             <Input label={"Email"} onChange={e=>{

             }}type="text" placeholder=" your email"></Input>
             <Input label={"Password"} onChange={e=>{

             }}type="password" placeholder="password"></Input>
              <div className="pt-4">
               <PrimaryButton onClick={()=>{
                
              }} size="big" > Get Started free</PrimaryButton>
         </div>
        </div>
        
      </div>
      </div>
    </div>
      
}