"use client";

import AddApplicationModal from "@/components/addApplicationModal";
import ApplicationCard from "@/components/applicationCard";
import EditApplicationModal from "@/components/editApplicationModal";
import { Application, Status } from "@/types";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isAddApplicationModalOpen, setIsAddApplicationModalOpen] =
    useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

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

  const filteredApplications = applications.filter((application) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(term) ||
      application.position.toLowerCase().includes(term) ||
      application.location.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === null || application.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

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
        <button
          onClick={() => setSelectedStatus(null)}
          className={`w-fit h-10 px-4 rounded-xl ${selectedStatus === null ? "bg-neutral-50" : "bg-neutral-200"}`}
        >
          All
        </button>
        {statuses.map((status) => (
          <button
            onClick={() => setSelectedStatus(status.status)}
            className={`w-fit h-10 px-4 rounded-xl ${selectedStatus === status.status ? "bg-neutral-50" : "bg-neutral-200"}`}
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
      ) : filteredApplications.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No application found.</p>
        </div>
      ) : (
        <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredApplications.map((application, index) => (
            <ApplicationCard
              key={application.id}
              data={application}
              onClick={() => setSelectedApplication(application)}
            />
          ))}
        </div>
      )}

      {isAddApplicationModalOpen && (
        <AddApplicationModal
          onClose={() => setIsAddApplicationModalOpen(false)}
          onSuccess={fetchApplications}
        />
      )}

      {selectedApplication !== null && (
        <EditApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onSuccess={fetchApplications}
        />
      )}
    </div>
  );
}
