import React from "react";
import FormatDate from "./FormatDate";
import { useReserves, useReserveCategory } from "@/app/services/queries";
import FilterUserCreate from "@/app/components/FilterUserCreate";
import FilterDays from "@/app/components/FilterDays";
import Skeleton from "react-loading-skeleton";

import AvailableForReserve from "@/app/components/AvailableForReserve";

const CardFilterCarrecord: React.FC = () => {
  const { data, isLoading } = useReserveCategory("carrecord");
  const carrecordCategory = data?.category;

  if (isLoading) return <Skeleton count={7} />;

  return (
    <>
      {carrecordCategory?.length > 0 ? (
        <FilterDays data={carrecordCategory} coutDate={7} />
      ) : (
        <AvailableForReserve />
      )}
    </>
  );
};

export default CardFilterCarrecord;
