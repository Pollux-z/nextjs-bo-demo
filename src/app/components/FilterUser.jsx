"use client";

import React from "react";
import { useUsers, useUser } from "../services/queries";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FilterUser({ userData }) {
  const { data: getUser, isLoading } = useUser(userData);
  const user = getUser?.user;
  return isLoading ? <Skeleton width={150} /> : user?.nameEng;
}
