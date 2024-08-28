"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/app/layers/userContext";
import Cookies from "js-cookie";

const ProfilePage: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const router = useRouter();
  const { user, setUser, logout } = useUser();




  
  if (typeof window === 'undefined' || !user) {
    // Return null or a loading spinner while checking user status
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-[50vw]">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <Button onClick={()=>{
        logout()
        toast.success("logged out successfully")
        router.push("/auth/login")
      }
      } className="mb-6">
        logout
      </Button>
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">{user.name}</h2>
        </CardHeader>
        <CardContent>
          <p>Email: {user.email}</p>
        </CardContent>
      </Card>

     

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">About</h2>
        </CardHeader>
        <CardContent>
          <p>This is the About section. More information about the user can be added here ..</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">_____</h2>
        </CardHeader>
        <CardContent>
          
          <p>this is a proetcted route</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
