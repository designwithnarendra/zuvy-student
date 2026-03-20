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
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRelativeNotificationTime, StudentNotification } from "@/lib/notifications";

interface NotificationCardProps {
  notification: StudentNotification;
  compact?: boolean;
  onPrimaryAction?: (notification: StudentNotification) => void;
  onMarkAsRead?: (notificationId: string) => void;
}

const shouldShowAction = (notification: StudentNotification) =>
  notification.interactionType !== "informational" && Boolean(notification.actionLabel && notification.actionLink);

const getCategoryIcon = (category: StudentNotification["category"]) => {
  switch (category) {
    case "learning_activity":
      return BellRing;
    case "live_classes":
      return Video;
    case "assessment":
      return BookOpen;
    case "mentor_support":
      return Clock3;
    case "announcements":
      return Megaphone;
    case "reminders":
      return CalendarClock;
    case "achievements":
      return CheckCheck;
    case "system_account":
      return Signal;
    default:
      return BellRing;
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

const getNotificationIcon = (notification: StudentNotification) => {
  const contentTypeIcon = getContentTypeIcon(notification.contentType);
  if (contentTypeIcon) {
    return contentTypeIcon;
  }

  return getCategoryIcon(notification.category);
};

const getAccentClasses = (category: StudentNotification["category"]) => {
  switch (category) {
    case "live_classes":
      return "bg-secondary-light text-secondary dark:text-secondary-dark";
    case "assessment":
      return "bg-warning-light text-warning dark:text-warning-dark";
    case "reminders":
      return "bg-warning-light text-warning dark:text-warning-dark";
    case "learning_activity":
      return "bg-info-light text-info dark:text-info-dark";
    case "mentor_support":
    case "system_account":
      return "bg-accent-light text-accent-dark dark:text-accent";
    case "announcements":
      return "bg-primary-light text-primary dark:text-primary-dark";
    case "achievements":
      return "bg-success-light text-success dark:text-success-dark";
    default:
      return "bg-muted-light text-muted-foreground dark:text-foreground";
  }
};

const getPriorityClasses = (priority: StudentNotification["priority"]) => {
  switch (priority) {
    case "critical":
      return "border-secondary/30 bg-secondary-light/20";
    case "high":
      return "border-warning/30 bg-warning-light/15";
    case "medium":
      return "border-primary/20 bg-background";
    case "low":
    default:
      return "border-border bg-background";
  }
};

const NotificationCard = ({
  notification,
  compact = false,
  onPrimaryAction,
  onMarkAsRead,
}: NotificationCardProps) => {
  const CategoryIcon = getNotificationIcon(notification);

  return (
    <div
      className={cn(
        "rounded-xl border p-4 shadow-soft transition-colors",
        getPriorityClasses(notification.priority),
        !notification.isRead && "border-primary/30 dark:bg-primary-light/10",
      )}
    >
      <div className={cn(compact ? "space-y-3" : "space-y-4")}>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              getAccentClasses(notification.category),
            )}
          >
            <CategoryIcon className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className={cn("font-heading font-semibold leading-snug text-foreground", compact ? "text-sm" : "text-lg")}>
                  {notification.event}
                </h3>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <span className="text-xs whitespace-nowrap text-muted-foreground/75">
                  {getRelativeNotificationTime(notification.timestamp)}
                </span>
                {!notification.isRead && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />}
              </div>
            </div>

            <div className="mt-1">
              <p className={cn("text-muted-foreground", compact ? "text-xs leading-5" : "text-sm leading-6")}>
                {notification.context}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pl-[3.25rem]">
          {shouldShowAction(notification) && (
            <Button size={compact ? "sm" : "default"} onClick={() => onPrimaryAction?.(notification)}>
              {notification.actionLabel}
            </Button>
          )}
          {!notification.isRead && onMarkAsRead && (
            <Button
              variant="ghost"
              size={compact ? "sm" : "default"}
              onClick={() => onMarkAsRead(notification.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              Mark as read
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
