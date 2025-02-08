import { TimeOff } from "@/interfaces/TimeOff";
import { UsersType } from "@/interfaces/User";

export type TotalTimeOff = {
    sortType: string;
    data: Array<TimeOff>;
    users: UsersType;
    sortYear: number;
  };


const GetTotalTimeOff: React.FC<TotalTimeOff> = (args) => {
  const {users, data, sortType, sortYear} = args;
  const userId = users?._id;

  const filterTimeOff = data?.filter(
    (i: TimeOff) =>
      i.employee === userId && i.status === "Complete" && i?.type === sortType
  );

  const queryDate: string[] = [];
  for (let index = 0; index < filterTimeOff?.length; index++) {
    const issueDateTotal = filterTimeOff[index].issueDate;
    for (let index = 0; index < issueDateTotal?.length; index++) {
      const element = issueDateTotal[index];
      const convertIssueDate = new Date(element);
      const getYear = convertIssueDate.getFullYear();
      if (getYear === sortYear) {
        queryDate.push(element);
      }
    }
  }


  const filterHaftDay = filterTimeOff?.filter(
    (i: TimeOff) => i?.halfDay != "FullDay"
  );

  const queryHalfDate: string[] = [];
  for (let index = 0; index < filterHaftDay?.length; index++) {
    const halfDateTotal = filterHaftDay[index].issueDate;
    for (let index = 0; index < halfDateTotal?.length; index++) {
      const element = halfDateTotal[index];
      const convertHalfDate = new Date(element);
      const getYear = convertHalfDate.getFullYear();
      if (getYear === sortYear) {
        queryHalfDate.push(element);
      }
    }
  }

  const calulateHalfDay = queryHalfDate?.length * 0.5;
  const calulateDate = queryDate.length - calulateHalfDay;

  return queryDate.length > 0 ? calulateDate : null;
  
};

export default GetTotalTimeOff;