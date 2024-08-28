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
        <h1 className="text-5xl font-extrabold font-sans"> Over Simplified Token Authenticated App</h1>
        <Card>
          <CardHeader>
            <CardTitle>Simple Token Authenticated App</CardTitle>
          </CardHeader>
          <CardContent className="w-[50vw] h-[300px]">
            <div className="flex flex-col gap-5 ">
              <Button className="w-full " onClick={() => toast.success("this is working")}>
                alert
              </Button>
              <Button className="w-full " onClick={() => toast.success("this is working")}>
                alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

   


    </main>
    </div>
  );
}
