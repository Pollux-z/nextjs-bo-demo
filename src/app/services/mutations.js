"use client";

import { useRouter } from "next/navigation";
import {
  createCarrecord,
  createCoverletter,
  createMeetingRoom,
  createProject,
  createReserveCarrecord,
  createSendEmail,
  createSwapDate,
  createTimeOff,
  createTopUp,
  createUser,
  createNotification,
  deleteReserve,
  updateCarrecord,
  updateCoverLetter,
  updateProject,
  updateReserve,
  updateSwapDate,
  updateTimeOff,
  updateUser,
  createInternalCharge,
  deleteInternalCharge,
  updateInternalCharge,
  createResignation,
  updateResignation,
  deleteResignation,

} from "./api";
import {
  useCarrecord,
  useReserves,
  useTimeOff,
  useUsers,
  useTimeOffs,
  useProjects,
  useCoverLetters,
  useTopUps,
  useSwapDates,
  useTimeOffJoinUsers,
  useMeetingRoomJoinEmployees,
  useReserveCategory,
  useGetNotifications,
  useInternalCharges,
  useResignations,
} from "./queries";
import useSWRMutation from "swr/mutation";

export function useReserveCarrecord() {
  const { mutate } = useReserves();
  const route = useRouter();

  return useSWRMutation(`/api/createReserve`, createReserveCarrecord, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/carrecord");
    },
  });
}

export function useCreateCarrecord() {
  const { mutate } = useCarrecord();
  const route = useRouter();

  return useSWRMutation(`/api/createCarrecord`, createCarrecord, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/carrecord");
    },
  });
}

export function useCreateMeetingRoom() {
  const { mutate } = useReserves();
  const route = useRouter();

  return useSWRMutation(`/api/createReserve`, createMeetingRoom, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/meetingroom");
    },
  });
}

export function useEditReserveAdmin(id) {
  const { mutate } = useReserves();
  const route = useRouter();

  return useSWRMutation(`/api/totalReserve/${id}`, updateReserve, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/meetingroomAdmin");
    },
  });
}

export function useDeleteMeetingRoom(id, mutateDate) {
  const { mutate: mutateCurrent } = useMeetingRoomJoinEmployees("Current");
  const { mutate: mutateMonth } = useMeetingRoomJoinEmployees("Month");
  const { mutate: mutateCarrecord} = useReserveCategory("carrecord");
  const route = useRouter();

  return useSWRMutation(`/api/deleteReverse?id=${id}`, deleteReserve, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutateCurrent();
      mutateMonth();
      mutateCarrecord();
    },
  });
}

export function useCreateProject() {
  const { mutate } = useProjects();
  const route = useRouter();

  return useSWRMutation(`/api/createProject`, createProject, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/project");
    },
  });
}

export function useCreateProjectAdmin() {
  const { mutate } = useProjects();
  const route = useRouter();

  return useSWRMutation(`/api/createProject`, createProject, {
    onError(err) {
      console.log(err.message);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/projectAdmin");
    },
  });
}

export function useUpdateProject(id) {
  const { mutate } = useProjects();
  const route = useRouter();

  return useSWRMutation(`/api/totalProject/${id}`, updateProject, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/project");
    },
  });
}

export function useUpdateProjectAdmin(id) {
  const { mutate } = useProjects();
  const route = useRouter();

  return useSWRMutation(`/api/totalProject/${id}`, updateProject, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/projectAdmin");
    },
  });
}

export function useCreateCoverletter() {
  const { mutate } = useCoverLetters();
  const route = useRouter();

  return useSWRMutation(`/api/createCoverletter`, createCoverletter, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/coverletter");
    },
  });
}

export function useCreateTopUp() {
  const { mutate } = useTopUps();
  const route = useRouter();

  return useSWRMutation(`/api/createTopUp`, createTopUp, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/topupAdmin");
    },
  });
}

export function useUpdateCarrecord(id) {
  const { mutate } = useCarrecord();
  const route = useRouter();

  return useSWRMutation(`/api/totalCarrecord/${id}`, updateCarrecord, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/carrecord");
    },
  });
}

// *Start Session: TIME Off

export function useCreateTimeOff() {
  const { mutate } = useTimeOffs();
  const route = useRouter();

  return useSWRMutation(`/api/createTimeOff`, createTimeOff, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/timeoff");
    },
  });
}

export function useAdminCreateTimeOff() {
  const { mutate } = useTimeOffs();
  const route = useRouter();

  return useSWRMutation(`/api/createTimeOff`, createTimeOff, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/timeoffAdmin");
    },
  });
}

export function useUpdateTimeOff(id) {
  const { mutate } = useTimeOffJoinUsers();
  const route = useRouter();

  return useSWRMutation(`/api/totalTimeOff/${id}`, updateTimeOff, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
}

export function useUpdateTimerWithOther(id) {
  const { mutate } = useUsers();
  const route = useRouter();

  return useSWRMutation(`/api/totalUsers/${id}`, updateUser, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
}

// End Session: TIME Off

export function useUpdateCoverLetter(id) {
  const { mutate } = useCoverLetters();
  const route = useRouter();

  return useSWRMutation(`/api/totalCoverletter/${id}`, updateCoverLetter, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/coverletter");
    },
  });
}

// *Session: Swap date

export function useCreateSwapDate() {
  const { mutate } = useSwapDates();
  const route = useRouter();

  return useSWRMutation(`/api/createSwapDate`, createSwapDate, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/swapdate");
    },
  });
}

export function useAdminCreateSwapDate() {
  const { mutate } = useSwapDates();
  const route = useRouter();

  return useSWRMutation(`/api/createSwapDate`, createSwapDate, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/swapdateAdmin");
    },
  });
}

export function useUpdateSwapDate(id) {
  const { mutate } = useSwapDates();
  const route = useRouter();

  return useSWRMutation(`/api/totalSwapDate/${id}`, updateSwapDate, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/users/swapdate");
    },
  });
}

export function useAdminUpdateSwapDate(id) {
  const { mutate } = useSwapDates();
  const route = useRouter();

  return useSWRMutation(`/api/totalSwapDate/${id}`, updateSwapDate, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/swapdateAdmin");
    },
  });
}

// *Session User Timer

export function useAdminUpdateTimerTimeOff(id) {
  const { mutate } = useTimeOffs();
  const route = useRouter();

  return useSWRMutation(`/api/totalUsers/${id}`, updateUser, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/timeoffAdmin");
    },
  });
}



export function useUpdateTimerAdmin(id) {
  const { mutate } = useUsers();
  const route = useRouter();

  return useSWRMutation(`/api/totalUsers/${id}`, updateUser, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/timerAdmin");
    },
  });
}

export function useSendEmail() {
  return useSWRMutation(`/api/sendEmail`, createSendEmail, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      // mutate();
      // route.push("/admin/timerAdmin");
    },
  });
}

export function useCreateUser() {
  const { mutate } = useUsers();
  const route = useRouter();

  return useSWRMutation(`/api/createUser`, createUser, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
      route.push("/admin/timerAdmin");
    },
  });
}

export function useCreateNotification() {
  const { mutate } = useGetNotifications();
  return useSWRMutation(`/api/createNotification`, createNotification, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
}

export function useCreateInternalCharge() {
  const { mutate } = useInternalCharges();
  const route = useRouter();
  return useSWRMutation(`/api/createInternalCharge`, createInternalCharge, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      route.push("/users/internalCharge/");
      mutate();
    },
  });
}

export function useUpdateInternalCharge(id) {
  const { mutate } = useInternalCharges();
  const route = useRouter();
  return useSWRMutation(`/api/totalInternalCharge/${id}`, updateInternalCharge, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      route.push("/users/internalCharge/");
      mutate();
    },
  });
}

export function useDeleteInternalCharge(id) {
  const { mutate } = useInternalCharges();
  return useSWRMutation(`/api/deleteInternalCharge?id=${id}`, deleteInternalCharge, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
}

export function useCreateResignation() {
  const { mutate } = useResignations();
  const route = useRouter();
  return useSWRMutation(`/api/createResign`, createResignation, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      route.push("/admin/resignationAdmin/");
      mutate();
    },
  });
}

export function useUpdateResignationMainPage(id) {
  const { mutate } = useResignations();
  const route = useRouter();
  return useSWRMutation(`/api/totalResignation/${id}`, updateResignation, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      // route.push("/admin/resignationAdmin/");
      mutate();
    },
  });
}

export function useDeleteResignation(id) {
  const { mutate } = useResignations();
  return useSWRMutation(`/api/totalResignation/${id}`, deleteResignation, {
    onError(err) {
      console.log(err);
    },
    onSuccess: () => {
      mutate();
    },
  });
}