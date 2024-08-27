import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("body is", body);

  const response = await fetch('http://localhost:4000/user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    })
  });
  const result = await response.json();

  console.log('result is', result);

  if (result) {

    cookies().set('accessToken', result.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    cookies().set('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    delete result.accessToken;
    delete result.refreshToken;

    console.log('Cookies============:', cookies());
    return NextResponse.json(result);
  }

  return NextResponse.json({
    success: false,
    message: 'Credential Error',
  })
}