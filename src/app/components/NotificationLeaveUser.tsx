import React from "react";
import Link from "next/link";
import { INotification } from "@/interfaces/Notification";

interface NotificationLeaveUserLeaderProps {
    notification: INotification;
    handleShowNotifications: () => void;
    }

export const NotificationLeaveUser: React.FC<NotificationLeaveUserLeaderProps> = ({ notification, handleShowNotifications }) => {

  return (
    <>
      <div className="mb-2">
        <p className="underline">รายการขอ Request การลา</p>
        <p>Request by {notification?.userRecords}</p>
      </div>
      <div>
        <Link
          onClick={handleShowNotifications}
          className="bg-blue-100 text-blue-500 py-1 px-2 text-xs rounded-lg shadow-sm"
          href={`/users/timeoff`}
        >
          View
        </Link>
      </div>
    </>
  );
};

export default NotificationLeaveUser;
