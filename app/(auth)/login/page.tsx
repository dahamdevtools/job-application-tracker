"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex-1 flex items-center justify-center p-7 overflow-y-scroll">
      <div className="w-full max-w-sm h-fit flex flex-col items-center p-7 gap-7 rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex flex-col items-center">
          <p className="text-neutral-500 text-center">Welcome Back!</p>
          <h1 className="text-xl font-semibold text-center">
            Sign in to your Account
          </h1>
        </div>
        <div className="w-full h-fit flex flex-col gap-5">
          <div className="w-full h-fit flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Enter your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Enter your Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <Link href={"/signup"} className="text-center">
          <span className="text-neutral-500">Don't have an Account?</span>{" "}
          <span className="underline">Sign Up here</span>
        </Link>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
