"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWithToken } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  const getProfile = async()=>{
      const res  = await fetchWithToken()
  }
  return (
    <main className="flex  min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full  items-center justify-center font-mono text-sm lg:flex">
        <h1 className="text-5xl font-extrabold font-sans">Simple Token Authenticated App</h1>
        <Card>
          <CardHeader>
            <CardTitle>Simple Token Authenticated App</CardTitle>
          </CardHeader>
          <CardContent className="w-[50vw]">
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
  );
}
