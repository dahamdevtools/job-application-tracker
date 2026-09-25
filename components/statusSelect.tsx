"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  value: number | null;
  onValueChange: (value: number | null) => void;
}

export function StatusSelect({ value, onValueChange }: Props) {
  const [stasuses, setStatuses] = useState<Status[]>([]);

  const fetchStatuses = async () => {
    const res = await fetch("/api/statuses");
    const data = await res.json();
    setStatuses(data);
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const items = stasuses.map((status) => ({
    label: status.status,
    value: status.id,
  }));

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(newValue) => onValueChange(newValue ?? null)}
    >
      <SelectTrigger className="w-full h-10! text-base ps-4! pe-3! rounded-xl border-0 bg-neutral-200/50">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent className="ring-0 shadow-xl shadow-neutral-900/5 bg-neutral-50">
        {stasuses.map((status) => (
          <SelectItem
            className="text-base h-10 rounded-none px-4 focus:bg-neutral-200/50"
            key={status.id}
            value={status.id}
          >
            {status.status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
