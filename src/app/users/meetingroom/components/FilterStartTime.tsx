import React from "react";
import { Time } from "@/app/db/option";
import { ReserveType } from "@/interfaces/Reserve";

type FilterStartTimeType = {
  dataFilter: any;
  name: string;
  value: string;
  onChange: any;
  disabled: boolean;
};

const FilterStartTime: React.FC<FilterStartTimeType> = ({
  dataFilter,
  name,
  value,
  onChange,
  disabled,
}) => {
  const diffTimeStart: string[] = [];
  for (let index = 0; index < dataFilter?.length; index++) {
    const element = dataFilter[index];
    const start = element?.startTime;
    const end = element?.endTime;
    const startSlipt = start.split(":");
    const endSlipt = end.split(":");
    const startTime = new Date(0, 0, 0, startSlipt[0], startSlipt[1], 0);
    const endTime = new Date(0, 0, 0, endSlipt[0], endSlipt[1], 0);
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);

    for (let index = 1; index < hours; index++) {
      const time = new Date(
        0,
        0,
        0,
        Number(startSlipt[0]) + index,
        startSlipt[1],
        0
      );
      const getTime = time.getHours();
      diffTimeStart.push(`${getTime}:00`);
    }
  }
  return (
    <>
      <select
        disabled={disabled}
        title="Select start time"
        name={name}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs ${
          disabled ? "bg-gray-200 opacity-30" : ""
        }`}
      >
        {Time.map((val) => (
          <option
            value={val}
            key={val}
            disabled={
              diffTimeStart?.find((element) => element === val) ||
              dataFilter?.find(
                (element: ReserveType) => element.startTime === val
              )
            }
          >
            {val}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterStartTime;
