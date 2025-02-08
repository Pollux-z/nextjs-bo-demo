"use client";
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/app/components/Header";
import NavbarAdmin from "@/app/admin/components/NavbarAdmin";
import { Teams, Role } from "@/app/db/option";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import EditProfile from "../../components/EditProfile";
import HeaderContent from "@/app/components/HeaderContent";
import InputComponents from "../../components/InputComponents";
import SeleteComponents from "../../components/SeleteComponents";

import { FiCommand } from "react-icons/fi";
import { useUser, useUsers } from "@/app/services/queries";
import { useUpdateTimerAdmin } from "@/app/services/mutations";
import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import FormEditUserAdmin from "../../components/FormEditUserAdmin";

type Params = {
  params: {
    id: string;
  };
};

function Page({ params }: Params): React.ReactNode {
  const { data: session } = useSession();
  const { id } = params;
  const { data: getUser, isLoading, isValidating, error } = useUser(id);
  const userData = getUser?.user;
  const { trigger, isMutating } = useUpdateTimerAdmin(id);
  const userUpdated = session?.user?.nameEng;

  const { data: users } = useUsers();
  const usersData = users?.totalUsers;

  const [inputData, setInputData] = useState({
    nameTh: "",
    nameEng: "",
    nickNameTh: "",
    employeeProfile: "",
    employeeTitle: "",
    employeeTeams: "",
    employeeTel: "",
    employeeEmail: "",
    employeeBirthDay: "",
    startDate: "",
    endDate: "",
    teamLeader: "",
    vacationLeave: "",
    sickLeave: "",
    personalLeave: "",
    remark: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({
      nameTh: inputData.nameTh,
      nameEng: inputData.nameEng,
      nickNameTh: inputData.nickNameTh,
      employeeProfile: inputData.employeeProfile,
      employeeTitle: inputData.employeeTitle,
      employeeTeams: inputData.employeeTeams,
      employeeTel: inputData.employeeTel,
      employeeEmail: inputData.employeeEmail,
      employeeBirthDay: inputData.employeeBirthDay,
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      teamLeader: inputData.teamLeader,
      vacationLeave: inputData.vacationLeave,
      sickLeave: inputData.sickLeave,
      personalLeave: inputData.personalLeave,
      remark: inputData.remark,
      password: inputData.password,
      role: inputData.role,
    });
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userData) {
      setInputData({
        nameTh: userData?.nameTh,
        nameEng: userData?.nameEng,
        nickNameTh: userData?.nickNameTh,
        employeeProfile: userData?.employeeProfile,
        employeeTitle: userData?.employeeTitle,
        employeeTeams: userData?.employeeTeams,
        employeeTel: userData?.employeeTel,
        employeeEmail: userData?.employeeEmail,
        employeeBirthDay: userData?.employeeBirthDay,
        startDate: userData?.startDate,
        endDate: userData?.endDate,
        teamLeader: userData?.teamLeader,
        vacationLeave: userData?.vacationLeave,
        sickLeave: userData?.sickLeave,
        personalLeave: userData?.personalLeave,
        remark: userData?.remark,
        password: "",
        role: userData?.role,
      });
    }
  }, [userData]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <main>
      <ContainerAdmin>
        <HeaderContent
          textHeader={`TIMER Admin`}
          textContent={`TIMER`}
          textContentSub={`Profile view`}
          hrefContent={`/admin/timerAdmin`}
        />
        <div className="bg-white py-5 px-10 w-full mt-5 ">
          <FormEditUserAdmin id={id}/>
        </div>
      </ContainerAdmin>
    </main>
  );
}

export default Page;
