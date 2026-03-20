import { mockCourses } from "@/lib/mockData";

export type NotificationInteractionType = "informational" | "actionable" | "reminder_alert";
export type NotificationContentType =
  | "live-class"
  | "video"
  | "article"
  | "assignment"
  | "coding-problem"
  | "quiz"
  | "feedback"
  | "assessment";

export type NotificationCategory =
  | "learning_activity"
  | "live_classes"
  | "assessment"
  | "mentor_support"
  | "announcements"
  | "reminders"
  | "achievements"
  | "system_account";

export type NotificationPriority = "critical" | "high" | "medium" | "low";

export type NotificationFilter =
  | "all"
  | "unread"
  | "learning_activity"
  | "live_classes"
  | "assessment"
  | "mentor_support"
  | "announcements"
  | "reminders"
  | "achievements"
  | "system_account";

export interface StudentNotification {
  id: string;
  category: NotificationCategory;
  contentType?: NotificationContentType;
  interactionType: NotificationInteractionType;
  priority: NotificationPriority;
  event: string;
  context: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionLink?: string;
}

export const NOTIFICATION_STORAGE_KEY = "zuvy_student_notifications_v22";
export const NOTIFICATION_LIMIT = 50;

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const liveClassReminderSample = (() => {
  const fallback = {
    liveClassName: "What is React? Components and JSX",
    moduleName: "React Fundamentals",
    startsAtText: "Starts at 9:00 AM",
  };

  const primaryCourse = mockCourses[0];
  if (!primaryCourse) {
    return fallback;
  }

  const reactFundamentalsModule = primaryCourse.modules.find((module) => module.name === "React Fundamentals");
  if (!reactFundamentalsModule) {
    return fallback;
  }

  const reactFundamentalsClass = reactFundamentalsModule.topics
    .flatMap((topic) => topic.items)
    .find((item) => item.type === "live-class" && item.title === "What is React? Components and JSX");

  if (!reactFundamentalsClass || !reactFundamentalsClass.scheduledDateTime) {
    return fallback;
  }

  return {
    liveClassName: reactFundamentalsClass.title,
    moduleName: reactFundamentalsModule.name,
    startsAtText: `Starts at ${reactFundamentalsClass.scheduledDateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`,
  };
})();

const assessmentNotificationSample = (() => {
  const fallback = {
    assessmentName: "DOM Concepts Assessment",
    moduleName: "DOM Manipulation & Events",
    startsAtText: "Starts at 9:00 AM",
  };

  const primaryCourse = mockCourses[0];
  if (!primaryCourse) {
    return fallback;
  }

  const domModule = primaryCourse.modules.find((module) => module.name === "DOM Manipulation & Events");
  if (!domModule) {
    return fallback;
  }

  const domAssessment = domModule.topics
    .flatMap((topic) => topic.items)
    .find((item) => item.type === "assessment" && item.id === "dom-concepts-assessment");

  if (!domAssessment || !domAssessment.scheduledDateTime) {
    return fallback;
  }

  return {
    assessmentName: domAssessment.title,
    moduleName: domModule.name,
    startsAtText: `Starts at ${domAssessment.scheduledDateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`,
  };
})();

const attendanceNudgeSample = (() => {
  const fallback = {
    courseName: "Full Stack JavaScript Development",
  };

  const primaryCourse = mockCourses[0];
  if (!primaryCourse) {
    return fallback;
  }

  return {
    courseName: primaryCourse.name,
  };
})();

const buildNotification = (
  notification: Omit<StudentNotification, "timestamp"> & { createdAt: string },
): StudentNotification => {
  const { createdAt, ...rest } = notification;

  return {
    ...rest,
    timestamp: createdAt,
  };
};

export const buildInitialNotifications = (): StudentNotification[] => {
  const seededNotifications: StudentNotification[] = [
  buildNotification({
    id: "notif-live-reminder-24h",
    category: "live_classes",
    interactionType: "reminder_alert",
    priority: "high",
    event: `Upcoming Live Class: ${liveClassReminderSample.liveClassName} is scheduled tomorrow`,
    context: `${liveClassReminderSample.moduleName} • ${liveClassReminderSample.startsAtText}`,
    createdAt: hoursAgo(24),
    isRead: false,
    }),
    buildNotification({
    id: "notif-live-reminder-12h",
    category: "live_classes",
    interactionType: "reminder_alert",
    priority: "high",
    event: `Reminder Live Class: Your upcoming class for ${liveClassReminderSample.liveClassName} is later today`,
    context: `${liveClassReminderSample.moduleName} • ${liveClassReminderSample.startsAtText}`,
    createdAt: hoursAgo(12),
    isRead: false,
    }),
    buildNotification({
    id: "notif-live-reminder-1h",
    category: "live_classes",
    interactionType: "reminder_alert",
    priority: "critical",
    event: `Starting Soon: ${liveClassReminderSample.liveClassName} begins in 1 hour`,
    context: `${liveClassReminderSample.moduleName} • ${liveClassReminderSample.startsAtText}`,
    createdAt: hoursAgo(1.1),
    isRead: false,
    }),
    buildNotification({
    id: "notif-live-realtime-5m",
    category: "live_classes",
    interactionType: "actionable",
    priority: "critical",
    event: `Get Ready: ${liveClassReminderSample.liveClassName} starts in 5 minutes`,
    context: `Module: ${liveClassReminderSample.moduleName}`,
    createdAt: hoursAgo(0.15),
    isRead: false,
    actionLabel: "Join Class",
    actionLink: "/course/1/module/3",
    }),
    buildNotification({
    id: "notif-live-follow-up-5m",
    category: "live_classes",
    interactionType: "actionable",
    priority: "critical",
    event: `You're Missing Out: ${liveClassReminderSample.liveClassName} has already started`,
    context: `Module: ${liveClassReminderSample.moduleName}`,
    createdAt: hoursAgo(0.08),
    isRead: false,
    actionLabel: "Join Class",
    actionLink: "/course/1/module/3",
    }),
  buildNotification({
    id: "notif-assessment-reminder-24h",
    category: "assessment",
    interactionType: "reminder_alert",
    priority: "high",
    event: `Upcoming Assessment: ${assessmentNotificationSample.assessmentName} is scheduled tomorrow`,
    context: `Module: ${assessmentNotificationSample.moduleName} • ${assessmentNotificationSample.startsAtText}`,
    createdAt: hoursAgo(22),
    isRead: false,
    }),
    buildNotification({
    id: "notif-assessment-reminder-10m",
    category: "assessment",
    interactionType: "reminder_alert",
    priority: "critical",
    event: `Starting Soon: ${assessmentNotificationSample.assessmentName} begins in 10 minutes`,
    context: `Module: ${assessmentNotificationSample.moduleName} • ${assessmentNotificationSample.startsAtText}`,
    createdAt: hoursAgo(0.22),
    isRead: false,
    }),
    buildNotification({
    id: "notif-assessment-live-now",
    category: "assessment",
    interactionType: "actionable",
    priority: "critical",
    event: `Live Now: ${assessmentNotificationSample.assessmentName} has started`,
    context: `Module: ${assessmentNotificationSample.moduleName}`,
    createdAt: hoursAgo(0.14),
    isRead: false,
    actionLabel: "Start Assessment",
    actionLink: "/assessment/1/2/dom-concepts-assessment",
    }),
    buildNotification({
    id: "notif-assessment-follow-up",
    category: "assessment",
    interactionType: "actionable",
    priority: "critical",
    event: `You're Missing Out: ${assessmentNotificationSample.assessmentName} has already started`,
    context: `Module: ${assessmentNotificationSample.moduleName}`,
    createdAt: hoursAgo(0.06),
    isRead: false,
    actionLabel: "Start Assessment",
    actionLink: "/assessment/1/2/dom-concepts-assessment",
    }),
    buildNotification({
    id: "notif-assessment-reattempt-approved",
    category: "assessment",
    interactionType: "actionable",
    priority: "high",
    event: `Reattempt Request Approved: Your request to reattempt the assessment ${assessmentNotificationSample.assessmentName} has been approved`,
    context: `Module: ${assessmentNotificationSample.moduleName}`,
    createdAt: hoursAgo(6.2),
    isRead: false,
    actionLabel: "Start Assessment",
    actionLink: "/assessment/1/2/dom-concepts-assessment",
    }),
    buildNotification({
    id: "notif-assessment-reattempt-declined",
    category: "assessment",
    interactionType: "informational",
    priority: "medium",
    event: `Your reattempt request for the assessment ${assessmentNotificationSample.assessmentName} has not been approved`,
    context: `Module: ${assessmentNotificationSample.moduleName}`,
    createdAt: hoursAgo(2.9),
    isRead: false,
    }),
    buildNotification({
    id: "notif-new-content-live-class",
    category: "announcements",
    contentType: "live-class",
    interactionType: "informational",
    priority: "medium",
    event: "New Live Class has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(0.5),
    isRead: false,
    }),
    buildNotification({
    id: "notif-new-content-video",
    category: "announcements",
    contentType: "video",
    interactionType: "informational",
    priority: "medium",
    event: "New Video has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(1.7),
    isRead: false,
    }),
  buildNotification({
    id: "notif-new-content-article",
    category: "announcements",
    contentType: "article",
    interactionType: "informational",
    priority: "medium",
    event: "New Article has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(4.5),
    isRead: false,
    }),
  buildNotification({
    id: "notif-new-content-assignment",
    category: "announcements",
    contentType: "assignment",
    interactionType: "informational",
    priority: "medium",
    event: "New Assignment has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(9),
    isRead: false,
    }),
  buildNotification({
    id: "notif-new-content-coding-problem",
    category: "announcements",
    contentType: "coding-problem",
    interactionType: "informational",
    priority: "medium",
    event: "New Coding Problem has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(15),
    isRead: true,
    }),
    buildNotification({
    id: "notif-new-content-quiz",
    category: "announcements",
    contentType: "quiz",
    interactionType: "informational",
    priority: "medium",
    event: "New Quiz has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(30),
    isRead: false,
    }),
  buildNotification({
    id: "notif-new-content-feedback",
    category: "announcements",
    contentType: "feedback",
    interactionType: "informational",
    priority: "medium",
    event: "New Feedback Form has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(54),
    isRead: true,
    }),
    buildNotification({
    id: "notif-new-content-assessment",
    category: "announcements",
    contentType: "assessment",
    interactionType: "informational",
    priority: "medium",
    event: "New Assessment has been added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(80),
    isRead: false,
    }),
    buildNotification({
    id: "notif-attendance-below-threshold",
    category: "reminders",
    interactionType: "reminder_alert",
    priority: "high",
    event: `Your attendance in the course ${attendanceNudgeSample.courseName} has fallen below 65%. Attend upcoming sessions and stay engaged with the learning material to improve your progress.`,
    context: "",
    createdAt: hoursAgo(0.7),
    isRead: false,
    }),
    buildNotification({
    id: "notif-engagement-nudge-d3-video",
    category: "reminders",
    contentType: "video",
    interactionType: "actionable",
    priority: "high",
    event: "You have not accessed the new video added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(72),
    isRead: false,
    actionLabel: "Check it out",
    actionLink: "/course/1/module/2?itemId=2-1-3",
    }),
  buildNotification({
    id: "notif-engagement-nudge-d6-video",
    category: "reminders",
    contentType: "video",
    interactionType: "actionable",
    priority: "high",
    event: "Don't miss the new video added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(144),
    isRead: true,
    actionLabel: "Open Content",
    actionLink: "/course/1/module/2?itemId=2-1-3",
    }),
  buildNotification({
    id: "notif-engagement-nudge-d9-video",
    category: "reminders",
    contentType: "video",
    interactionType: "actionable",
    priority: "high",
    event: "Continue your learning with the new video added in the module DOM Manipulation & Events",
    context: "",
    createdAt: hoursAgo(216),
    isRead: true,
    actionLabel: "Open Content",
    actionLink: "/course/1/module/2?itemId=2-1-3",
    }),
  ];

  return seededNotifications.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};

export const getNotificationCategoryLabel = (category: NotificationCategory) => {
  switch (category) {
    case "learning_activity":
      return "Learning";
    case "live_classes":
      return "Live Classes";
    case "assessment":
      return "Assessment";
    case "mentor_support":
      return "Mentor";
    case "announcements":
      return "Announcements";
    case "reminders":
      return "Reminders";
    case "achievements":
      return "Achievements";
    case "system_account":
      return "System";
  }
};

export const getRelativeNotificationTime = (timestamp: string) => {
  const diffMs = new Date(timestamp).getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const absMinutes = Math.abs(diffMinutes);

  if (absMinutes < 60) {
    return diffMinutes > 0 ? `in ${absMinutes} min` : `${absMinutes} min ago`;
  }

  const diffHours = Math.round(absMinutes / 60);
  if (diffHours < 24) {
    return diffMinutes > 0 ? `in ${diffHours} hr` : `${diffHours} hr ago`;
  }

  if (diffHours < 48 && diffMinutes < 0) {
    return "Yesterday";
  }

  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const getNotificationsForFilter = (
  notifications: StudentNotification[],
  filter: NotificationFilter,
) => {
  switch (filter) {
    case "unread":
      return notifications.filter((notification) => !notification.isRead);
    case "learning_activity":
    case "live_classes":
    case "assessment":
    case "mentor_support":
    case "announcements":
    case "reminders":
    case "achievements":
    case "system_account":
      return notifications.filter((notification) => notification.category === filter);
    case "all":
    default:
      return notifications;
  }
};
