"use client";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  
  return (
    <div className="">
      <NavBar/>
      <main className="flex  min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 w-full  items-center justify-center font-mono text-sm lg:flex">
          <h1 className="text-5xl font-extrabold font-sans">Over Simplified Token Authenticated App</h1>
          <Card>
            <CardHeader>
              <CardTitle>Simple Token Authenticated App</CardTitle>
            </CardHeader>
            <CardContent className="w-[50vw] h-[300px]">
              <div className="flex flex-col gap-5">
                <p>
                  This app uses token-based authentication, with two-way tokens.
                </p>
                <p>
                  Token-based authentication is a popular method for securing web applications. It involves generating a unique token for each user upon successful login, which is then used to authenticate subsequent requests. This approach eliminates the need for session management on the server-side and provides a stateless authentication mechanism.
                </p>
                <p>
                  In this simplified app, we demonstrate the basic concepts of token-based authentication. The user can log in using their credentials and receive a token in response. This token is then stored locally and sent with each subsequent request to authenticate the user. If the token is valid, the user is granted access to protected resources.
                </p>
                <p>
                  The use of two-way tokens adds an extra layer of security. Two-way tokens are encrypted and can be decrypted by the server to verify their authenticity. This prevents tampering and ensures that only valid tokens are accepted.
                </p>
                <p>
                  Feel free to explore the app and see how token-based authentication works in practice. Remember, this is a simplified version, and in real-world scenarios, additional security measures and best practices should be implemented.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
