import React from "react";
import Link from "next/link";
import { INotification } from "@/interfaces/Notification";

interface NotificationLeaveTeamLeaderProps {
    notification: INotification;
    handleShowNotifications: () => void;
    }

export const NotificationLeaveTeamLeader: React.FC<NotificationLeaveTeamLeaderProps> = ({ notification, handleShowNotifications }) => {

  return (
    <>
      <div className="mb-2">
        <p className="underline">มีการขออนุมัติวันลา</p>
        <p>Request by {notification?.userRecords}</p>
      </div>
      <div>
        <Link
          onClick={handleShowNotifications}
          className="bg-blue-100 text-blue-500 py-1 px-2 text-xs rounded-lg shadow-sm"
          href={`/users/timeoff/request`}
        >
          View
        </Link>
      </div>
    </>
  );
};

export default NotificationLeaveTeamLeader;
