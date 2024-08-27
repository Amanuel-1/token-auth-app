import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// // Helper function to refresh the access token
// export async function refreshAccessToken() {
//   try {
//     const response = await fetch('http://localhost:4000/user/token', {
//       method: 'POST',
//       credentials: 'include', // Include cookies in the request
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to refresh token');
//     }

//     const data = await response.json();
//     Cookies.set('access_token', data.access_token, { expires: 1 }); // Set token expiration as needed
//     return data.access_token;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     redirect("/auth/login");
//     throw error; // Ensure the error propagates
//   }
// }

// // Fetch wrapper that handles token management
// export async function fetchWithToken(url: string, options: RequestInit = {}) {
//   let access_token = Cookies.get('access_token');

//   if (!access_token) {
//     try {
//       access_token = await refreshAccessToken();
//     } catch (error) {
//       throw new Error('Unable to refresh token');
//     }
//   }

//   try {
//     const verifyResponse = await fetch("http://localhost:4000/user/verify-token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//       },
//       credentials: 'include',
//     });

//     if (!verifyResponse.ok) {
//       // Refresh token if verification fails
//       const refreshResponse = await fetch("http://localhost:4000/user/token", {
//         method: "POST",
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${access_token}`,
//         },
//       });

//       if (refreshResponse.ok) {
//         const data = await refreshResponse.json();
//         Cookies.set('access_token', data.access_token, { expires: 1 }); // Set token expiration as needed
//         access_token = data.access_token;
//       } else {
//         throw new Error('Failed to refresh token');
//       }
//     }

//     // Make the actual request
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization: `Bearer ${access_token}`,
//       },
//       credentials: 'include',
//     });

//     return response;
//   } catch (error) {
//     console.error('Error during fetch:', error);
//     throw error;
//   }
// }

// // Example test function to check token endpoint
// export const testToken = async () => {
//   try {
//     const response = await fetchWithToken('http://localhost:4000/user/token', {
//       method: 'POST',
//     });
//     const data = await response.json();
//     console.log('Token response:', data);
//   } catch (error) {
//     console.error("Error fetching token:", error);
//   }
// }

export async function handleVerification() {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return { error: "You are not logged in", success: false };
    }
    const res = await fetch("http://localhost:4000/user/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("here is the verified data ", data);
      return { error: "", success: true, data: data };
    } else {
      console.error("your session has expired");

      return { error: "Your session has expired", success: false };
    }
  } catch (err) {
    return { error: `${err}`, success: false };
  }
}
