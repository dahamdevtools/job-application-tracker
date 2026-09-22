"use client";

import { NavItemTypes } from "@/types/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LuArrowLeft, LuFileText, LuLayers, LuUser } from "react-icons/lu";

const NavItems: NavItemTypes[] = [
  { route: "/dashboard", label: "Dashboard", icon: <LuLayers /> },
  { route: "/applications", label: "Applications", icon: <LuFileText /> },
  { route: "/profile", label: "Profile", icon: <LuUser /> },
];

export default function SideMenu() {
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-72 h-screen hidden lg:flex overflow-hidden py-3.5">
      <div className="w-full h-full flex flex-col rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex px-3.5">
          <div className="w-full h-fit py-6 px-4 border-b border-neutral-200">
            <p className="text-lg">Job Application Tracker</p>
          </div>
        </div>
        <div className="w-full min-h-0 flex-1 flex-col overflow-y-auto p-8">
          {NavItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className={`${pathName === item.route ? "border-neutral-400/50 text-neutral-600 bg-neutral-200/50" : "border-neutral-200/50 hover:border-neutral-200 text-neutral-400 hover:bg-neutral-100"} transition-colors duration-200 w-full h-12 flex items-center px-4 gap-3 rounded-r-xl border-l-4`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="w-full h-fit px-3.5 flex">
          <div className="w-full h-fit flex items-center justify-center py-4 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full h-12 disabled:opacity-50 rounded-xl flex items-center px-4 gap-2 duration-200 hover:bg-neutral-200/50"
            >
              <LuArrowLeft className="text-lg" />
              <span>{loading ? "Logging out..." : "Log out"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
