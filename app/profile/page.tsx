"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import { fetchWithToken, refreshAccessToken, testToken } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";

type User = {
  name: string;
  email: string;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [clicks, setClicks] = useState(0);

  const router = useRouter();

  // Function to verify user authentication
  const getUser = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if(!accessToken){
        toast.error("You are not logged in");
        router.push("/auth/login");
      }
      const res = await fetch("http://localhost:4000/user/verify-token",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
    
      });

      if(res.ok){
        const data = await res.json();
        console.log("here is the verified data " ,data)
        setUser(data.user);
      }

      else {
        toast.error("your session has expired")
        
        router.push("/auth/login");
      }

    }
    catch(err){
      console.log(err);
      toast.error("You are not logged in");
      router.push("/auth/login")

    }
  };

  // Run getUser when the component mounts
  useEffect(() => {
    getUser();
  }, [clicks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., API call to update user data)
    alert("Profile updated!");
  };

  return (
    <div className="container mx-auto max-w-[50vw]">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <Button onClick={() => setClicks(clicks + 1)} className="mb-6">
        Call refresh
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
          <h2 className="text-xl font-semibold">Update Profile</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <Input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <Input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full" />
            </div>

            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">About</h2>
        </CardHeader>
        <CardContent>
          <p>This is the About section. You can add more information here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </CardHeader>
        <CardContent>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main St, City, Country</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
