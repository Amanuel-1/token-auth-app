"use client"

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { handleVerification } from '@/lib/utils';

type User = {
  id: string;
  email: string;
  name: string;
};

const UserContext = createContext<{
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}>({
  user: null,
  isLoading: true,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          toast.error("You are not logged in");
          router.push("/auth/login");
          return;
        }

        const verify = await handleVerification();

        if (!verify.success) {
          toast.error(verify.error);
        //   router.push("/auth/login");
          return;
        }

        console.log("this is the verified data", verify.data);

        if (verify.data && verify.data.user) {
          setUser(verify.data.user);
        } else {
          console.error("User data is missing in the response");
          toast.error("User data is missing in the response");
        //   router.push("/auth/login");
        }
      } catch (err) {
        console.log(err);
        toast.error(`You are not logged in, ${err}`);
        // router.push("/auth/login");

      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
