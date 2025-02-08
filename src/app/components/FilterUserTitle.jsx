'use client'

import React from "react";
import { useUsers } from "../services/queries";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function FilterUserTitle({ userData }) {
  const { data: users, isLoading } = useUsers();
  const usersData = users?.totalUsers;
  const filterUser = usersData?.find((element) => element?._id === userData);
  return isLoading ? <Skeleton width={150}/> : filterUser?.employeeTitle;
}

export default FilterUserTitle;
