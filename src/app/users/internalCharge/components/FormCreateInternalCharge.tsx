"use client";

import {
  useProjects,
  useUsers,
  useUsersTeamConsultant,
} from "@/app/services/queries";
import { ProjectType } from "@/interfaces/Project";
import { UsersType } from "@/interfaces/User";
import React from "react";
import Select from "react-select";
import SellerInternalCharge from "./SellerInternalCharge";
import { useCreateInternalCharge } from "@/app/services/mutations";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

type selectedOptions = {
  value: string;
  label: string;
};

function FormCreateInternalCharge() {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const sessionUserId = sessionUser?.id;

  const [sellerUserId, setSellerUserId] = React.useState<selectedOptions>();
  const [selectedOptions, setSelectedOptions] =
    React.useState<selectedOptions>();
  const [selectedTeam, setSelectedTeam] = React.useState<selectedOptions>();
  const [selectedProject, setSelectedProject] = React.useState<
    selectedOptions | undefined
  >();
  const [selectedStatus, setSelectedStatus] = React.useState<
    selectedOptions | undefined
  >({
    value: "Pending",
    label: "Pending",
  });
  const [selectedSeller, setSelectedSeller] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");

  const { trigger: createInternalCharge } = useCreateInternalCharge();

  // const { data: getUsers, isLoading, error } = useUsers();
  // const users: UsersType[] = getUsers?.totalUsers;

  const {
    data: usersTeamConsultant,
    isLoading,
    error,
  } = useUsersTeamConsultant();
  const users: UsersType[] = usersTeamConsultant;


  users?.sort((a, b) => {
    return a.userCode - b.userCode;
  });

  const { data: getProjects } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;

  const optionUser = users?.map((user) => ({
    value: user._id,
    label: `TIME-${user.userCode} ${user.nameEng} (${user.nickNameTh})`,
  }));

  const optionProject = projects?.map((project) => ({
    value: project._id,
    label: `TIME-${project.projectCode} ${project.projectEng}`,
  }));

  const userTeams: string[] = [];

  users?.map((user: any) => {
    if (
      !userTeams.includes(user.employeeTeams) &&
      user.employeeTeams !== null &&
      user.employeeTeams !== undefined
    ) {
      userTeams.push(user.employeeTeams);
    }
  });

  userTeams.sort((a, b) => {
    return a.localeCompare(b);
  });

  const optionTeam = userTeams.map((team) => ({
    value: team,
    label: team,
  }));

  const optionStatus = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Pending", label: "Pending" },
    { value: "Cancel", label: "Cancel" },
  ];

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createInternalCharge({
      title,
      buyerUserId: sessionUserId,
      sellerUserId: sellerUserId?.value,
      sellerTeam: selectedTeam?.value,
      sellerUser: selectedSeller,
      projectRequest: selectedProject?.value,
      note,
      status: selectedStatus?.value,
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <div>
      <p className="border-l-2 border-purple-500 px-2 font-semibold">
        Create Internal Charge
      </p>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="" className="text-sm">
                Title
              </label>
              <input
                type="text"
                className="text-sm mt-2 w-full border border-gray-300 rounded-md p-3"
                placeholder="Please input title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Project
              </label>
              <Select
                value={selectedProject}
                onChange={(selected) => {
                  setSelectedProject(selected || undefined);
                }}
                isClearable
                isSearchable
                name="color"
                options={optionProject}
                className="text-sm mt-2"
                placeholder="Select project"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "45px",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }),
                }}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Buyer request
              </label>
              <input
                type="text"
                className="text-sm mt-2 w-full border border-gray-300 rounded-md p-3"
                placeholder="Buyer request"
                disabled
                value={`${sessionUser?.nameEng}`}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Seller User
              </label>
              <Select
                value={sellerUserId}
                onChange={(selected) => {
                  setSellerUserId(selected || undefined);
                }}
                isClearable
                isSearchable
                name="color"
                options={optionUser}
                className="text-sm mt-2"
                placeholder="Select seller user"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "45px",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }),
                }}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Seller Team
              </label>
              <Select
                isClearable
                value={selectedTeam}
                onChange={(selected) => {
                  setSelectedTeam(selected || undefined);
                }}
                isSearchable
                name="color"
                options={optionTeam as any}
                className="text-sm mt-2"
                placeholder="Select team buyer"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "45px",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }),
                }}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Status
              </label>
              <Select
                value={selectedStatus}
                onChange={(selected) => {
                  setSelectedStatus(selected || undefined);
                }}
                isClearable
                isSearchable
                name="color"
                options={optionStatus}
                className="text-sm mt-2"
                placeholder="Select status"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    height: "45px",
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }),
                }}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="" className="text-sm">
                Notes <span className="text-xs">(option)</span>
              </label>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type a description or add a note here..."
                className="text-sm mt-2 h-40 w-full border border-gray-300 rounded-md p-3 resize-none"
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="border-l-2 border-purple-500 px-2 font-semibold mb-3">
              Seller Internal Charge
            </p>
            <SellerInternalCharge
              setSelectedSeller={setSelectedSeller}
              sellerInternChagres={selectedSeller}
              enableEdit={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCreateInternalCharge;
