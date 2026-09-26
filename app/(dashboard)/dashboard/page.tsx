"use client";

import ApplicationCard from "@/components/applicationCard";
import { Application } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuBriefcaseBusiness,
  LuCalendar,
  LuClock,
  LuHandshake,
} from "react-icons/lu";

const PIPELINE_STATUSES = [
  "Saved",
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Accepted",
];
const CLOSED_STATUSES = ["Rejected", "Withdrawn"];

const STATUS_BAR_COLOR: Record<string, string> = {
  Saved: "bg-neutral-300",
  Applied: "bg-blue-300",
  Screening: "bg-cyan-300",
  Interview: "bg-amber-300",
  Offer: "bg-violet-300",
  Accepted: "bg-emerald-300",
};

const STATUS_DOT_COLOR: Record<string, string> = {
  Saved: "bg-neutral-300",
  Applied: "bg-blue-300",
  Screening: "bg-cyan-300",
  Interview: "bg-amber-300",
  Offer: "bg-violet-300",
  Accepted: "bg-emerald-300",
};

const CLOSED_DOT_COLOR: Record<string, string> = {
  Rejected: "bg-red-300",
  Withdrawn: "bg-slate-300",
};

function PingDot({ color }: { color: string }) {
  return (
    <span className="h-full aspect-square flex items-center justify-center rounded-full overflow-visible relative">
      <span
        className={`w-3 absolute aspect-square rounded-full animate-ping ${color}`}
      />
      <span className={`w-3 aspect-square rounded-full ${color}`} />
    </span>
  );
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const counts = PIPELINE_STATUSES.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));

  const closedCounts = CLOSED_STATUSES.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));

  const ACTIVE_STATUSES = [
    "Saved",
    "Applied",
    "Screening",
    "Interview",
    "Offer",
  ];

  const totalApplications = applications.length;
  const activeApplications = applications.filter((a) =>
    ACTIVE_STATUSES.includes(a.status),
  ).length;
  const interviewCount = applications.filter(
    (a) => a.status === "Interview",
  ).length;
  const offerCount = applications.filter((a) => a.status === "Offer").length;

  const fetchApplications = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="w-full flex-1 min-h-0 min-w-0 flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <h1 className="text-xl">Dashboard</h1>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-indigo-200 bg-indigo-300 text-neutral-50 text-2xl">
            <LuBriefcaseBusiness />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Total Applications
            </p>
            <p className="font-semibold text-3xl text-ellipsis line-clamp-1">
              {totalApplications}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-cyan-200 bg-cyan-300 text-neutral-50 text-2xl">
            <LuClock />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Active Applications
            </p>
            <p className="font-semibold text-3xl text-ellipsis line-clamp-1">
              {activeApplications}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-orange-200 bg-orange-300 text-neutral-50 text-2xl">
            <LuCalendar />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Interviews
            </p>
            <p className="font-semibold text-3xl text-ellipsis line-clamp-1">
              {interviewCount}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-emerald-200 bg-emerald-300 text-neutral-50 text-2xl">
            <LuHandshake />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Offers
            </p>
            <p className="font-semibold text-3xl text-ellipsis line-clamp-1">
              {offerCount}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex flex-col gap-4 p-5 px-6 rounded-2xl bg-neutral-50">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">Pipeline</h3>
          <span className="text-neutral-400">
            {applications.length} application
            {applications.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden flex bg-neutral-200">
          {counts.map(({ status, count }) =>
            count === 0 ? null : (
              <div
                key={status}
                className={STATUS_BAR_COLOR[status]}
                style={{ flexGrow: count, flexBasis: 0, flexShrink: 0 }}
                title={`${status}: ${count}`}
              />
            ),
          )}
        </div>

        <div className="w-full flex flex-wrap gap-x-5 gap-y-3 text-neutral-500">
          {counts.map(({ status, count }) => (
            <span key={status} className="h-4 flex items-center gap-1.5">
              <PingDot color={STATUS_DOT_COLOR[status]} />
              {status} ({count})
            </span>
          ))}
        </div>

        <hr className="border-neutral-200" />

        <div className="w-full flex flex-wrap items-center justify-between gap-4 text-neutral-500">
          <span>Closed without an offer</span>
          <span className="flex items-center flex-wrap gap-3">
            {closedCounts.map(({ status, count }) => (
              <span key={status} className="h-4 flex items-center gap-1.5">
                <PingDot color={CLOSED_DOT_COLOR[status]} />
                {status} ({count})
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h3 className="text-lg font-semibold">Recent Applications</h3>
        <Link
          href={"/applications"}
          className="w-fit h-10 px-3 gap-2 ps-5 flex items-center rounded-xl bg-neutral-200"
        >
          <span>See All</span>
          <LuArrowRight className="text-lg" />
        </Link>
      </div>

      {loading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No applications yet.</p>
        </div>
      ) : (
        <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {applications.slice(0, 9).map((application) => (
            <ApplicationCard key={application.id} data={application} />
          ))}
        </div>
      )}
    </div>
  );
}
