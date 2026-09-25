import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuCalendar } from "react-icons/lu";

interface Props {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ date, onDateChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={"outline"}
            data-empty={!date}
            className="w-full font-normal hover:bg-neutral-200/50 text-base h-10 border-0 outline-0 bg-neutral-200/50 p-0 ps-4 pe-3 justify-between data-[empty=true]:text-neutral-500"
          >
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="truncate text-base font-normal">
                Pick a date
              </span>
            )}
            <LuCalendar className="text-neutral-400 size-4.5" />
          </Button>
        }
      />
      <PopoverContent
        className="w-auto p-0 ring-0 shadow-xl shadow-neutral-900/5 bg-neutral-50"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          defaultMonth={date}
          classNames={{
            caption_label: "text-base",
            day_button:
              "text-base rounded-xl hover:bg-neutral-200/50 data-[selected-single=true]:bg-indigo-100 data-[selected-single=true]:text-indigo-500",
            day: "size-9",
            weekday:
              "text-base size-9 flex items-center justify-center font-normal text-neutral-400",
            chevron: "size-5",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
