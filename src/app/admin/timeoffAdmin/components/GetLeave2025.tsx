import { useUser, useUsers } from '@/app/services/queries';
import { UsersType } from '@/interfaces/User'
import React from 'react'

type ArgumentType = {
  users: UsersType;
  sortType: any;
}

const GetLeave2025: React.FC<ArgumentType> = (args) => {
  const {users, sortType} = args;
  const sortTypeCondition = sortType === "Vacation" ? "vacationLeave" : sortType === "Personal Leave" ? "personalLeave" : "sickLeave";
  return (
    <p className="text-sm text-gray-500">{users?.year2025Leave?.[sortTypeCondition]}</p>
  )
}

export default GetLeave2025