"use client";

import { Application } from "@/types";
import { useState } from "react";
import { DatePicker } from "./ui/datePicker";
import { StatusSelect } from "./statusSelect";
import { LuX } from "react-icons/lu";

interface Props {
  application: Application;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditApplicationModal({
  application,
  onClose,
  onSuccess,
}: Props) {
  const [company, setCompany] = useState(application.company);
  const [position, setPosition] = useState(application.position);
  const [location, setLocation] = useState(application.location);
  const [salary, setSalary] = useState(application.salary);
  const [appliedDate, setAppliedDate] = useState<Date | undefined>(
    application.applied_at ? new Date(application.applied_at) : new Date(),
  );
  const [notes, setNotes] = useState(
    application.notes ? application.notes : "",
  );
  const [url, setUrl] = useState(application.url);
  const [status, setStatus] = useState<number | null>(application.status_id);
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSave = async () => {
    setSaveError("");
    setDeleteError("");
    setSaveLoading(true);

    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          company,
          position,
          location,
          salary,
          applied_at: appliedDate,
          notes,
          url,
          status_id: status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error);
        setSaveLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update application", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");
    setSaveError("");
    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setDeleteError(data.error);
        setDeleteLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete application", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 flex p-7 bg-neutral-900/5 overflow-y-auto">
      <div className="w-full max-w-sm h-fit flex flex-col rounded-2xl bg-neutral-50 m-auto">
        <div className="w-full h-fit flex items-center justify-between gap-4 p-4 ps-6">
          <p className="font-semibold text-lg">Add Application</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg text-red-400 bg-red-100"
          >
            <LuX />
          </button>
        </div>
        <div className="w-full px-3.5">
          <hr className="border-neutral-200" />
        </div>
        <div className="w-full h-fit flex flex-col gap-4 p-4">
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Company..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="position">Position</label>
            <input
              id="position"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Position..."
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Salary..."
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="url">Url</label>
            <input
              id="url"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Url..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="Notes..."
              rows={2}
              spellCheck="false"
              className="w-full rounded-xl px-4 py-3 resize-none bg-neutral-200/50"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="date">Date</label>
            <DatePicker date={appliedDate} onDateChange={setAppliedDate} />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="status">Status</label>
            <StatusSelect value={status} onValueChange={setStatus} />
          </div>
          {saveError && <p className="text-red-400">{saveError}</p>}
          {deleteError && <p className="text-red-400">{deleteError}</p>}
        </div>
        <div className="w-full h-fit flex flex-wrap justify-end p-4 pt-0 gap-2">
          <button
            disabled={saveLoading}
            onClick={handleSave}
            className="w-fit h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
          >
            {saveLoading ? "Saving..." : "Save"}
          </button>
          <button
            disabled={deleteLoading}
            onClick={handleDelete}
            className="w-fit h-10 disabled:opacity-50 rounded-xl px-5 text-red-500 bg-red-100"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
