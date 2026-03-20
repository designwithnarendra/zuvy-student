import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  buildInitialNotifications,
  NOTIFICATION_LIMIT,
  NOTIFICATION_STORAGE_KEY,
  NotificationContentType,
  StudentNotification,
} from "@/lib/notifications";

const validCategories = new Set<StudentNotification["category"]>([
  "learning_activity",
  "live_classes",
  "assessment",
  "mentor_support",
  "announcements",
  "reminders",
  "achievements",
  "system_account",
]);

const validContentTypes = new Set<NotificationContentType>([
  "live-class",
  "video",
  "article",
  "assignment",
  "coding-problem",
  "quiz",
  "feedback",
  "assessment",
]);

const isValidNotification = (notification: unknown): notification is StudentNotification => {
  if (!notification || typeof notification !== "object") {
    return false;
  }

  const candidate = notification as Partial<StudentNotification>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.event === "string" &&
    typeof candidate.context === "string" &&
    typeof candidate.timestamp === "string" &&
    typeof candidate.isRead === "boolean" &&
    typeof candidate.interactionType === "string" &&
    typeof candidate.priority === "string" &&
    typeof candidate.category === "string" &&
    (typeof candidate.contentType === "undefined" || validContentTypes.has(candidate.contentType as NotificationContentType)) &&
    validCategories.has(candidate.category as StudentNotification["category"])
  );
};

const readNotificationsFromStorage = (): StudentNotification[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(NOTIFICATION_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidNotification);
  } catch {
    return [];
  }
};

interface NotificationsContextValue {
  notifications: StudentNotification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);

  useEffect(() => {
    const storedNotifications = readNotificationsFromStorage();
    const initialNotifications =
      storedNotifications.length > 0 ? storedNotifications : buildInitialNotifications().slice(0, NOTIFICATION_LIMIT);

    setNotifications(initialNotifications);

    if (storedNotifications.length === 0 && typeof window !== "undefined") {
      window.localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(initialNotifications));
    }
  }, []);

  useEffect(() => {
    if (notifications.length === 0 || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      NOTIFICATION_STORAGE_KEY,
      JSON.stringify(notifications.slice(0, NOTIFICATION_LIMIT)),
    );
  }, [notifications]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const markAsRead = (notificationId: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }

  return context;
};
