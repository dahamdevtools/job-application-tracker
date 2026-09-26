import Link from "next/link";
import { LuBanknote, LuCalendar, LuLink, LuMapPin } from "react-icons/lu";

export default function ApplicationCard() {
  return (
    <div className="w-full h-full flex flex-col rounded-2xl bg-neutral-50 p-4 ps-5 gap-4">
      <div className="w-full h-fit flex justify-between gap-4">
        <div className="flex-1 h-fit flex flex-col">
          <p className="text-ellipsis line-clamp-1 font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <p className="text-ellipsis line-clamp-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
        <p className="text-ellipsis line-clamp-1 leading-8 h-8 rounded-lg px-3 text-sm bg-indigo-50 text-indigo-500">
          Applied
        </p>
      </div>
      <div className="w-full h-fit flex items-center gap-3.5 text-neutral-500">
        <span className="w-fit h-fit flex items-center gap-1.5">
          <LuMapPin />
          <p className="text-ellipsis line-clamp-1">Remote</p>
        </span>
        <span className="w-fit h-fit flex items-center gap-1.5">
          <LuBanknote className="text-lg" />
          <p className="text-ellipsis line-clamp-1">$28/hr</p>
        </span>
      </div>
      <p className="text-ellipsis h-full line-clamp-2 text-neutral-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
        perspiciatis! Atque non temporibus harum quis eveniet illo quibusdam
        officiis nihil.
      </p>
      <div className="w-full h-fit flex items-end justify-between gap-4">
        <span className="w-full h-fit flex items-center gap-1.5 text-neutral-500">
          <LuCalendar />
          <p className="text-ellipsis line-clamp-1">Applied Aug 29</p>
        </span>
        <Link
          href={"/"}
          className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-indigo-50 text-indigo-500"
        >
          <LuLink />
        </Link>
      </div>
    </div>
  );
}
