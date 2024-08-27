import { NextRequest } from "next/server";


export async function protectedMiddleWare  (req:NextRequest){

}



export const config = {
    matcher: ['/profile_page', '/dashboard', '/settings'], // Protect specific routes
};