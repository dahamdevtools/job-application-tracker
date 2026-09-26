"use client";

import AddApplicationModal from "@/components/addApplicationModal";
import ApplicationCard from "@/components/applicationCard";
import { Application, Status } from "@/types";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isAddApplicationModalOpen, setIsAddApplicationModalOpen] =
    useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const getStatuses = async () => {
    const res = await fetch("/api/statuses/");
    const data = await res.json();

    if (!res.ok) {
      return console.error("Failed to fetch stasuses", data.error);
    }

    setStatuses(data);
  };

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
    getStatuses();
    fetchApplications();
  }, []);

  return (
    <div className="w-full min-h-0 h-full min-w-0 flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl">Applications</h1>
        <div className="w-fit h-fit flex flex-wrap items-center gap-2">
          <input
            type="text"
            spellCheck="false"
            placeholder="Search Company or Position..."
            className="w-full sm:max-w-72 h-10 rounded-xl px-4 truncate bg-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsAddApplicationModalOpen(true)}
            className="w-fit h-10 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100"
          >
            <LuPlus className="text-lg" />
            <span>Add Application</span>
          </button>
        </div>
      </div>
      <div className="w-full h-fit flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            className="w-fit h-10 px-4 rounded-xl bg-neutral-200"
            key={status.id}
          >
            {status.status}
          </button>
        ))}
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
          {applications.map((application, index) => (
            <ApplicationCard key={index} data={application} />
          ))}
        </div>
      )}

      {isAddApplicationModalOpen && (
        <AddApplicationModal
          onClose={() => setIsAddApplicationModalOpen(false)}
          onSuccess={fetchApplications}
        />
      )}
    </div>
  );
}
