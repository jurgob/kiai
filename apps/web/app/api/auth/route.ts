// app/api/authenticate/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const response = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to validate token", response);
      const data = await response.json();
      return NextResponse.json({ error: "Invalid token", dump: data}, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to validate token", dump: error }, { status: 500 });
  }
}
