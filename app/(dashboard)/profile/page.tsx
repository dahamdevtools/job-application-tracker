"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const getUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch user data", data.error);
      setError(data.error);
      return;
    }

    setName(data.name);
    setEmail(data.email);
  };

  const handleSave = async () => {
    setError("");
    setSaveLoading(true);

    try {
      const res = await fetch("/api/auth/user/", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setSaveLoading(false);
        return;
      }

      getUser();
      router.refresh();
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setDeleteLoading(true);

    try {
      const res = await fetch("/api/user/", { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setDeleteLoading(false);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <h1 className="text-xl">Edit Profile</h1>
      <div className="w-full max-w-sm h-fit flex flex-col gap-5 rounded-2xl p-7 bg-neutral-50">
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            spellCheck="false"
            className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            spellCheck="false"
            className="w-full h-10 disabled:opacity-50 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Email..."
            disabled={true}
            value={email}
          />
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            spellCheck="false"
            className="w-full h-10 disabled:opacity-50 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Password..."
            disabled={true}
            value={"password"}
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          onClick={handleSave}
          disabled={saveLoading}
          className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
        >
          {saveLoading ? "Saving..." : "Save Profile"}
        </button>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-red-500 bg-red-100"
        >
          {deleteLoading ? "Deleting..." : "Delete Profile"}
        </button>
      </div>
    </div>
  );
}
