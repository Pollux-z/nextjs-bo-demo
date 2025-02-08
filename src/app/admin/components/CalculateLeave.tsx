import { CalculateLeave, GetTotalLeave, TimeOff, TotalTimeOff } from "@/interfaces/TimeOff";

// export const getCalculateLeave = ({
//   sortType,
//   dataTimeOffs,
//   users,
// }: CalculateLeave) => {

//   const vacaltionLeave2023 = users?.year2023Leave
//     ? users?.year2023Leave.vacationLeave
//     : 0;
//   const totalVacationLeave =
//     users?.year2024Leave.vacationLeave + vacaltionLeave2023;
//   const totalPersonalLeave = users?.year2024Leave.personalLeave;
//   const totalSickLeave = users?.year2024Leave.sickLeave;

//   const filterTimeOff = dataTimeOffs?.filter(
//     (i: TimeOff) =>
//       i.employee === users._id &&
//       i.status === "Complete" &&
//       i?.type === sortType
//   );

//   const queryDate = [];
//   for (let index = 0; index < filterTimeOff?.length; index++) {
//     const issueDateTotal = filterTimeOff[index].issueDate;
//     for (let index = 0; index < issueDateTotal?.length; index++) {
//       const element = issueDateTotal[index];
//       queryDate.push(element);
//     }
//   }

//   const totalLeave =
//     sortType === "Vacation"
//       ? totalVacationLeave
//       : sortType === "Personal Leave"
//       ? totalPersonalLeave
//       : totalSickLeave;

//   const filterHaftDay = filterTimeOff?.filter((i: TimeOff) => i?.halfDay != "FullDay");
//   const calulateHalfDay = filterHaftDay?.length * 0.5;
//   const resultTimeoffs = totalLeave - queryDate.length + calulateHalfDay;
//   return resultTimeoffs;
// };

export const getTotalLeave = ({sortType, users}: GetTotalLeave) => {
  const vacaltionLeave2023 = users?.year2023Leave
    ? users?.year2023Leave.vacationLeave
    : 0;
  const totalVacationLeave =
    users?.year2024Leave?.vacationLeave + vacaltionLeave2023;
  const totalPersonalLeave = users?.year2024Leave?.personalLeave;
  const totalSickLeave = users?.year2024Leave?.sickLeave;

  const totalLeave =
    sortType === "Vacation"
      ? totalVacationLeave
      : sortType === "Personal Leave"
      ? totalPersonalLeave
      : totalSickLeave;
      
  return totalLeave;
};

// export const getTotalTimeOff = ({users, data, sortType}: TotalTimeOff) => {
//   const userId = users?._id;

//   const filterTimeOff = data?.filter(
//     (i: TimeOff) =>
//       i.employee === userId && i.status === "Complete" && i?.type === sortType
//   );

//   const queryDate = [];
//   for (let index = 0; index < filterTimeOff?.length; index++) {
//     const issueDateTotal = filterTimeOff[index].issueDate;
//     for (let index = 0; index < issueDateTotal?.length; index++) {
//       const element = issueDateTotal[index];
//       queryDate.push(element);
//     }
//   }

//   const filterHaftDay = filterTimeOff?.filter((i: TimeOff) => i?.halfDay != "FullDay");
//   const calulateHalfDay = filterHaftDay?.length * 0.5;
//   const calulateDate = queryDate.length - calulateHalfDay;

//   return queryDate.length > 0 ? calulateDate : null;
// };
