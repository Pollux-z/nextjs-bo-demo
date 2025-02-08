'use client'

import React from "react";
import { useUsers } from "../services/queries";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { User } from "next-auth";
import { UsersType } from "@/interfaces/User";



const FilterUserCreate: React.FC<{ userData: string }> = ({ userData }) => {
  const { data: users, isLoading } = useUsers();
  const usersData: UsersType[] = users?.totalUsers;
  const filterUser = usersData?.find((element) => element?._id === userData);
  return isLoading ? <Skeleton width={150}/> : filterUser?.nameEng;
}

export default FilterUserCreate;
