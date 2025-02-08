"use client";

import {
  useInternalChargeById,
  useProjects,
  useUsers,
  useUsersTeamConsultant,
} from "@/app/services/queries";
import { ProjectType } from "@/interfaces/Project";
import { UsersType } from "@/interfaces/User";
import React, { useEffect } from "react";
import Select from "react-select";
import { StatusApprove } from "../../../db/option";
import SellerInternalCharge from "./SellerInternalCharge";
import {
  useCreateInternalCharge,
  useUpdateInternalCharge,
} from "@/app/services/mutations";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import ButtonApprovalInternCharge from "./ButtonApprovalInternCharge";

type selectedOptions = {
  value: string;
  label: string;
};

function FormEditInternalCharge({ id }: { id: string }) {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const sessionUserId = sessionUser?.id;
  const sessionUserRole = sessionUser?.role;
  console.log(sessionUserRole);

  const {
    data: internalChargeById,
    isLoading,
    error,
  } = useInternalChargeById(id);

  // const [selected, setSelected] = React.useState<selectedOptions>();

  // const [selectedOptions, setSelectedOptions] =
  //   React.useState<selectedOptions>();

  const [enableEdit, setEnableEdit] = React.useState(true);

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

  const { trigger: updateInternalCharge } = useUpdateInternalCharge(id);

  const { data: usersTeamConsultant } = useUsersTeamConsultant();
  const users: UsersType[] = usersTeamConsultant;

  users?.sort((a, b) => {
    return a.userCode - b.userCode;
  });

  const options = users?.map((user) => ({
    value: user._id,
    label: `TIME-${user.userCode} ${user.nameTh} (${user.nickNameTh})`,
  }));

  const { data: getProjects } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    updateInternalCharge({
      title,
      sellerTeam: selectedTeam?.value,
      sellerUser: selectedSeller,
      projectRequest: selectedProject?.value,
      note,
      status: selectedStatus?.value,
    });
  };

  const handleStatus = (status: string) => {
    updateInternalCharge({
      title,
      sellerTeam: selectedTeam?.value,
      sellerUser: selectedSeller,
      projectRequest: selectedProject?.value,
      note,
      status: status,
    });
  };

  useEffect(() => {
    if (internalChargeById) {
      setTitle(internalChargeById.title);
      setSelectedTeam({
        value: internalChargeById.sellerTeam,
        label: internalChargeById.sellerTeam,
      });
      setSelectedProject({
        value: internalChargeById.projectRequest,
        label: `TIME-${internalChargeById?.projectInternalCharge.projectCode} ${internalChargeById?.projectInternalCharge.projectEng}`,
      });
      setSelectedStatus({
        value: internalChargeById.status,
        label: internalChargeById.status,
      });
      setNote(internalChargeById.note);
    }
  }, [internalChargeById]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="border-l-2 border-purple-500 px-2 font-semibold ">
          Edit Internal Charge
        </p>
        <div className="flex items-center space-x-2">
          {internalChargeById?.sellerUserId === sessionUserId ||
          sessionUserRole === "Admin" ? (
            <ButtonApprovalInternCharge onChangeStatus={handleStatus} />
          ) : null}
          {sessionUserId === internalChargeById?.buyerUserId ||
          sessionUserRole === "Admin" ? (
            <button
              type="button"
              onClick={() => setEnableEdit(!enableEdit)}
              className={`${
                enableEdit
                  ? "bg-teal-100 text-teal-500 hover:bg-teal-500"
                  : "bg-orange-100 text-orange-500 hover:bg-orange-500"
              } hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm`}
            >
              {enableEdit ? "Edit" : "Close"}
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="" className="text-sm">
                Title
              </label>
              <input
                disabled={enableEdit}
                value={title}
                type="text"
                className="text-sm mt-2 w-full border border-gray-300 rounded-md p-3"
                placeholder="Please input title..."
                onChange={(e) => setTitle(e.target.value)}
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
                value={`${internalChargeById?.buyerUser.nameEng}`}
              />
            </div>

            <div>
              <label htmlFor="" className="text-sm">
                Seller Team
              </label>
              <Select
                isDisabled={enableEdit}
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
                Project
              </label>
              <Select
                isDisabled={enableEdit}
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
                Note
              </label>
              <textarea
                disabled={enableEdit}
                value={note}
                className="text-sm mt-2 h-40 w-full border border-gray-300 rounded-md p-3 resize-none"
                placeholder="Please input note..."
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mt-5 ">
            <p className="border-l-2 border-purple-500 px-2 font-semibold mb-3">
              Edit Seller Internal Charge
            </p>
            <SellerInternalCharge
              enableEdit={enableEdit}
              // internalChargeById={internalChargeById}
              setSelectedSeller={setSelectedSeller}
              sellerInternChagres={internalChargeById?.sellerUsers}
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

export default FormEditInternalCharge;
