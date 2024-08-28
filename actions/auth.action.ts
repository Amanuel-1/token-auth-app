"use server"

import { signInSchema, signUpSchema } from "@/lib/utils"
import { Cookie } from "next/font/google";
import { cookies } from "next/headers"
import { z } from "zod"
// utils/csrf.ts
async function fetchCsrfToken() {
    try {
      const response = await fetch('http://localhost:4000/get-csrf-token', {
        method: 'GET',
        credentials: 'include', // This is important for including cookies
      });
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
      const data = await response.json();
      
    //   response.headers.set('set-cookie',`_csrf=${data.csrfToken}`)
    //   console.log("this is the cookie from  header ",response.headers.get("_csrf"))
      const csrf = response.headers.get("set-cookie")
      const token =csrf?.split('=')[1];
      console.log("ths is theee token +++++++++++  ",csrf)
      
      return token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  }

  export const signIn = async (data: z.infer<typeof signInSchema>) => {
    try {
        // const csrfToken = await fetchCsrfToken();
        // if (!csrfToken) {
        //     return { success: false, error: "Failed to obtain CSRF token", response: "" };
        // }

        const res = await fetch("http://localhost:4000/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "_csrf": csrfToken,
            },
            credentials: 'include', //for sending cookies
            body: JSON.stringify(data)
        });

        
        
        if (res.ok) {
        const result = await res.json();

            console.log("this is the result", result);
            return { success: true, error: "", response: JSON.stringify(result) };
        }

        console.log("something went wrong", res);
        console.log("gettig ======== " ,)
        return { success: false, error: "something went wrong", response: JSON.stringify(res) };
    }
    catch (error) {
        console.log(error);
        return { success: false, error: `error: ${error}`, response: "" };
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