import { Application } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import { LuBanknote, LuCalendar, LuLink, LuMapPin } from "react-icons/lu";

interface Props {
  data: Application;
  onClick: () => void;
}

const STATUS_STYLE: Record<string, string> = {
  Saved: "bg-neutral-100 text-neutral-500",
  Applied: "bg-blue-100/50 text-blue-500",
  Screening: "bg-cyan-100/50 text-cyan-600",
  Interview: "bg-amber-100/50 text-amber-600",
  Offer: "bg-violet-100/50 text-violet-500",
  Accepted: "bg-emerald-100/50 text-emerald-500",
  Rejected: "bg-red-100/50 text-red-500",
  Withdrawn: "bg-slate-100 text-slate-500",
};

export default function ApplicationCard({ data, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full h-full flex flex-col rounded-2xl bg-neutral-50 p-4 ps-5 gap-4"
    >
      <div className="w-full h-fit flex justify-between gap-4">
        <div className="flex-1 h-fit flex flex-col">
          <p className="text-ellipsis line-clamp-1 font-bold">{data.company}</p>
          <p className="text-ellipsis line-clamp-1">{data.position}</p>
        </div>
        <p
          className={`text-ellipsis line-clamp-1 leading-8 h-8 rounded-lg px-3 text-sm ${
            STATUS_STYLE[data.status] ?? "bg-neutral-100 text-neutral-500"
          }`}
        >
          {data.status}
        </p>
      </div>
      <div className="w-full h-fit flex items-center gap-3.5 text-neutral-500">
        <span className="w-fit h-fit flex items-center gap-1.5">
          <LuMapPin />
          <p className="text-ellipsis line-clamp-1">{data.location}</p>
        </span>
        <span className="w-fit h-fit flex items-center gap-1.5">
          <LuBanknote className="text-lg" />
          <p className="text-ellipsis line-clamp-1">{data.salary}</p>
        </span>
      </div>
      <p className="text-ellipsis h-full line-clamp-2 text-neutral-400">
        {data.notes}
      </p>
      <div className="w-full h-fit flex items-end justify-between gap-4">
        <span className="w-full h-fit flex items-center gap-1.5 text-neutral-500">
          <LuCalendar />
          <p className="text-ellipsis line-clamp-1">
            {data.status === "Saved"
              ? "Not Applied yet"
              : "Applied " + format(new Date(data.applied_at), "MMM dd, yyyy")}
          </p>
        </span>
        {data.url && (
          <Link
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-indigo-50 text-indigo-500"
          >
            <LuLink />
          </Link>
        )}
      </div>
    </div>
  );
}
