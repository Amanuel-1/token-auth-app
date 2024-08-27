"use server"

import { signInSchema, signUpSchema } from "@/lib/utils"
import { cookies } from "next/headers"
import { z } from "zod"


export const signIn  = async (data: z.infer<typeof signInSchema>) => {
    try {
        const res =  await fetch("http://localhost:4000/user/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await res.json()
        
        if(res.ok){
            console.log("this is the result")
        
            // console.log("success")
            return {success:true,error:"",response:JSON.stringify(result)}
        }

        console.log("something went wrong",result)
        return {success:false,error:result.message,response:result}
      
    }
    catch(error){
        console.log(error)
        return {success:false,error:`error: ${error}`,response:""}
    }

    

}


export const signUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
        const res =  await fetch("http://localhost:4000/user/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await res.json()
        
        if(res.ok){
            console.log("this is the result",result)
            return {success:true,error:"",response:JSON.stringify(result)}
        }

        console.log("something went wrong",result)
        return {success:false,error:result.message,response:result}
      
    }
    catch(error){
        console.log(error)
        return {success:false,error:`error: ${error}`,response:""}
    }

    

}