import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-y-scroll p-7 gap-3.5">
      <h1 className="text-3xl text-center font-semibold">
        Job Application Tracker
      </h1>
      <h2 className="text-lg text-center text-neutral-500">
        Track, manage, and stay on top of your job search.
      </h2>
      <Link
        href={"/login"}
        className="w-fit h-10 flex items-center justify-center rounded-xl px-5 text-indigo-500 bg-indigo-100"
      >
        Get Started
      </Link>
    </div>
  );
}
