"use client";

import { useUsers } from "@/app/services/queries";
import React from "react";
import FilterHistoryMonth from "./FilterHistoryMonth";
import FilterTotalHistory from "./FilterTotalHistory";
import Loading from "@/app/loading";
import Error from "@/app/Error";

function FilterHistory({ searchQuery, sortType }) {
  const { data: getUsers, isLoading, isValidating, error } = useUsers();
  const users = getUsers?.totalUsers;
  const searchInput = searchQuery.toLowerCase();

  const filterUser = users?.filter((val) =>
    val?.nameEng.toLowerCase().includes(searchInput)
  );

  return (
    <>
      {filterUser?.map((val, index) => (
        <tr key={index} className="text-center *:border *:text-sm">
          <td className="text-left px-3 py-1">{val?.nameEng}</td>
          <td>{val?.vacationLeave}</td>
          <td>
            <FilterTotalHistory id={val?._id} sortType={sortType} />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={1}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={2}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={3}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={4}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={5}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={6}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={7}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={8}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={9}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={10}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={11}
              sortType={sortType}
            />
          </td>
          <td>
            <FilterHistoryMonth
              id={val?._id}
              filterMonth={12}
              sortType={sortType}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

export default FilterHistory;
