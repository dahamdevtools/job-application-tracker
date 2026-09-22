import MobileMenu from "@/components/mobileMenu";
import SideMenu from "@/components/sideMenu";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const session = await getCurrentUser();

  return (
    <div className="w-full max-w-360 h-screen overflow-hidden flex px-3.5 gap-3.5">
      <SideMenu />
      <main className="flex-1 min-w-0 flex flex-col pt-3.5">
        <div className="w-full h-fit flex items-center justify-between gap-4 ps-6 p-3.5 rounded-2xl bg-neutral-50">
          <p className="text-neutral-500 truncate">Welcome {session?.name}!</p>
          <div className="w-fit h-fit flex items-center gap-3.5">
            <Link
              href={"/profile"}
              className="w-10 h-10 aspect-square rounded-full flex items-center justify-center text-xl border-4 border-indigo-200 bg-indigo-400 text-indigo-50"
            >
              <LuUser />
            </Link>
            <MobileMenu />
          </div>
        </div>
        <hr className="border-neutral-200 mt-3.5" />
        {children}
      </main>
    </div>
  );
}
