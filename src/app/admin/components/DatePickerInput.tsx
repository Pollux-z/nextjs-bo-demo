import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { CiCalendar } from "react-icons/ci";

function DatePickerInput(
  {
    issueDate,
    setIssueDate,
    format = "MM/DD/YYYY",
  }: {
    issueDate: DateObject | null;
    setIssueDate: (value: DateObject) => void;
    format?: string;
  }
) 

{
  const handleOnChange = (date: DateObject | null) => {
    if (date) {
      setIssueDate(date);
    }
  }

  return (
    <div>
      <DatePicker
        containerStyle={{
          width: "100%",
        }}
        name="issueDate"
        calendarPosition="bottom-center"
        sort
        value={issueDate}
        format={format}
        onChange={handleOnChange}
        placeholder="Please selete date..."
        render={(value, openCalendar) => (
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 w-full">
            <input
              readOnly
              value={value}
              onClick={openCalendar}
              placeholder="Select a date"
              className="w-full focus:outline-none"
            />
            <CiCalendar
              size={18}
              onClick={openCalendar}
              className="ml-2 cursor-pointer"
            />
          </div>
        )}
      />
    </div>
  );
}

export default DatePickerInput;
