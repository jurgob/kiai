// app/hf/login/page.tsx
"use client";
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import {Button} from "@repo/ui/components/ui/button";
export default function LoginPage() {
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const router = useRouter()

    try {
      const res = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        router.push('/hf')
        // window.location.href = "/hf"; // Redirect to protected route after login
      } else {
        throw new Error("Invalid Hugging Face token");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='p-4' >Login with Hugging Face Token</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2 p-4 w-[540px]">
          <input
            type="text"
            placeholder="Enter Hugging Face token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border p-2 flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Validating..." : "Login"}
          </Button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
