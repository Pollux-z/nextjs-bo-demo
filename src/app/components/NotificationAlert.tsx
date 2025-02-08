import React, {
  useEffect,
  useState,
  useRef,
  use,
  useCallback,
  useMemo,
} from "react";
import { IoNotificationsCircle } from "react-icons/io5";
import {
  useGetNotificationByUserId,
  useGetNotifications,
} from "../services/queries";
import { INotification } from "@/interfaces/Notification";
import Link from "next/link";
import NotificationLeaveTeamLeader from "./NotificationLeaveTeamLeader";
import NotificationLeaveUser from "./NotificationLeaveUser";

interface NotificationAlertProps {
  userId: string;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ userId }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsAlert, setNotificationsAlert] = useState(false);
  const [prevNotifications, setPrevNotifications] = useState<INotification[]>(
    []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: getNotifications } = useGetNotificationByUserId(userId);
  const notifications: INotification[] = getNotifications?.totalNotifications;

  const { data: getAllNotifications } = useGetNotifications();
  const allNotifications: INotification[] =
    getAllNotifications?.totalNotifications;

    console.log(allNotifications)

  const filteredNotifications = useMemo(() => {
    return allNotifications?.filter(
      (notification) =>
        notification?.userRequest.toString() === userId ||
        notification?.teamsLeader === userId
    );
  }, [allNotifications, userId]);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
    setNotificationsAlert(false); // Hide alert when the dropdown is opened
  };

  useEffect(() => {
    if (notifications) {
      // Compare current notifications with previous notifications
      const hasNewNotifications =
        prevNotifications.length !== notifications.length ||
        JSON.stringify(prevNotifications) !== JSON.stringify(notifications);

      if (hasNewNotifications) {
        setNotificationsAlert(true); // Show the alert if new notifications are fetched
      }

      setPrevNotifications(notifications); // Update the previous notifications state
    }
  }, [notifications, prevNotifications]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={handleShowNotifications}
        className="relative"
        ref={buttonRef}
      >
        {notificationsAlert && (
          <div className="h-2.5 w-2.5 rounded-full bg-red-500 absolute -right-0"></div>
        )}
        <IoNotificationsCircle size={30} className="text-blue-600" />
      </button>

      {showNotifications && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 bg-white shadow-md rounded-md p-3 text-sm z-10 min-w-96  overflow-y-auto max-h-96"
        >
          <p>Notification</p>
          {allNotifications?.map((notification, index: number) => (
            <div key={index} className="flex justify-between items-center">
              {notification.teamsLeader === userId ? (
                <NotificationLeaveTeamLeader
                  notification={notification}
                  handleShowNotifications={handleShowNotifications}
                />
              ) : notification.userRequest.toString() === userId ? (
                <NotificationLeaveUser
                  notification={notification}
                  handleShowNotifications={handleShowNotifications}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationAlert;
