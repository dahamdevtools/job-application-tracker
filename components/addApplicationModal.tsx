"use client";

import { useState } from "react";
import { LuX } from "react-icons/lu";
import { DatePicker } from "./ui/datePicker";
import { StatusSelect } from "./statusSelect";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddApplicationModal({ onClose, onSuccess }: Props) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [appliedDate, setAppliedDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    onClose();
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
          {error && <p className="text-red-400">{error}</p>}
        </div>
        <div className="w-full h-fit flex justify-end p-4 pt-0">
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-fit h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
          >
            {loading ? "Adding..." : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
