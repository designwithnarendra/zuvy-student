import {
  BellRing,
  BookOpen,
  CalendarClock,
  CheckCheck,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Code2,
  FileText,
  GraduationCap,
  Megaphone,
  MessageSquare,
  Signal,
  UserCheck,
  Video,
} from "lucide-react";
import { StudentNotification } from "@/lib/notifications";

type NotificationVisualGroup =
  | "learning_activity"
  | "live_classes"
  | "assessment"
  | "attendance"
  | "announcements"
  | "new_content"
  | "reminders"
  | "achievements"
  | "system_account"
  | "default";

const attendanceEventPattern =
  /^Your attendance in the course\s+.+\s+has fallen below 65%\.\s+Attend upcoming sessions and stay engaged with the learning material to improve your progress\.$/i;

const getCategoryIcon = (category: StudentNotification["category"]) => {
  switch (category) {
    case "learning_activity":
      return BellRing;
    case "live_classes":
      return Video;
    case "assessment":
      return BookOpen;
    case "announcements":
      return Megaphone;
    case "reminders":
      return CalendarClock;
    case "achievements":
      return CheckCheck;
    case "system_account":
      return Signal;
    default:
      return Clock3;
  }
};

const getContentTypeIcon = (contentType: StudentNotification["contentType"]) => {
  switch (contentType) {
    case "live-class":
      return Video;
    case "video":
      return Video;
    case "article":
      return FileText;
    case "assignment":
      return ClipboardCheck;
    case "coding-problem":
      return Code2;
    case "quiz":
      return CircleHelp;
    case "feedback":
      return MessageSquare;
    case "assessment":
      return GraduationCap;
    default:
      return null;
  }
};

const getVisualGroup = (notification: StudentNotification): NotificationVisualGroup => {
  if (attendanceEventPattern.test(notification.event)) {
    return "attendance";
  }

  if (notification.category === "announcements" && notification.contentType) {
    return "new_content";
  }

  if (notification.category === "learning_activity") return "learning_activity";
  if (notification.category === "live_classes") return "live_classes";
  if (notification.category === "assessment") return "assessment";
  if (notification.category === "announcements") return "announcements";
  if (notification.category === "reminders") return "reminders";
  if (notification.category === "achievements") return "achievements";
  if (notification.category === "system_account") return "system_account";
  return "default";
};

export const getNotificationIcon = (notification: StudentNotification) => {
  if (attendanceEventPattern.test(notification.event)) {
    return UserCheck;
  }

  const contentTypeIcon = getContentTypeIcon(notification.contentType);
  if (contentTypeIcon) {
    return contentTypeIcon;
  }

  return getCategoryIcon(notification.category);
};

export const getNotificationIconShellClasses = (notification: StudentNotification) => {
  switch (getVisualGroup(notification)) {
    case "live_classes":
      return "bg-secondary-light text-secondary dark:text-secondary-dark";
    case "assessment":
      return "bg-warning-light text-warning dark:text-warning-dark";
    case "attendance":
      return "bg-info-light text-info dark:text-info-dark";
    case "new_content":
      return "bg-primary-light text-primary dark:text-primary-dark";
    case "reminders":
      return "bg-accent-light text-accent-dark dark:text-accent";
    case "learning_activity":
      return "bg-info-light text-info dark:text-info-dark";
    case "announcements":
      return "bg-primary-light text-primary dark:text-primary-dark";
    case "achievements":
      return "bg-success-light text-success dark:text-success-dark";
    case "system_account":
      return "bg-accent-light text-accent-dark dark:text-accent";
    default:
      return "bg-muted-light text-muted-foreground dark:text-foreground";
  }
};

