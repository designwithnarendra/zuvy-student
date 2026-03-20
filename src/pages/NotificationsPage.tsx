import { useMemo, useState } from "react";
import {
  Bell,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications } from "@/hooks/use-notifications";
import { getNotificationIcon, getNotificationIconShellClasses } from "@/lib/notificationVisuals";
import {
  getNotificationsForFilter,
  getRelativeNotificationTime,
  NotificationFilter,
  StudentNotification,
} from "@/lib/notifications";
import { cn } from "@/lib/utils";

const shouldShowAction = (notification: StudentNotification) =>
  notification.interactionType !== "informational" && Boolean(notification.actionLabel && notification.actionLink);

const notificationFilters: Array<{ value: NotificationFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "learning_activity", label: "Learning" },
  { value: "live_classes", label: "Live Classes" },
  { value: "assessment", label: "Assessment" },
  { value: "announcements", label: "Announcements" },
  { value: "reminders", label: "Reminders" },
  { value: "achievements", label: "Achievements" },
];

const isStartedLiveClassNotification = (notification: StudentNotification) =>
  notification.category === "live_classes" && notification.actionLabel === "Join Now";

const getLiveClassTitleParts = (eventText: string) => {
  const templates: Array<{
    pattern: RegExp;
    prefix: string;
    suffix: string;
  }> = [
    {
      pattern: /^Upcoming Live Class:\s*(.+?)\s+is scheduled tomorrow$/i,
      prefix: "Upcoming Live Class: ",
      suffix: " is scheduled tomorrow",
    },
    {
      pattern: /^Reminder Live Class:\s*Your upcoming class for\s+(.+?)\s+is later today$/i,
      prefix: "Reminder Live Class: Your upcoming class for ",
      suffix: " is later today",
    },
    {
      pattern: /^Starting Soon:\s*(.+?)\s+begins in 1 hour$/i,
      prefix: "Starting Soon: ",
      suffix: " begins in 1 hour",
    },
    {
      pattern: /^Upcoming Assessment:\s*(.+?)\s+is scheduled tomorrow$/i,
      prefix: "Upcoming Assessment: ",
      suffix: " is scheduled tomorrow",
    },
    {
      pattern: /^Starting Soon:\s*(.+?)\s+begins in 10 minutes$/i,
      prefix: "Starting Soon: ",
      suffix: " begins in 10 minutes",
    },
    {
      pattern: /^Live Now:\s*(.+?)\s+has started$/i,
      prefix: "Live Now: ",
      suffix: " has started",
    },
    {
      pattern: /^Reattempt Request Approved:\s*Your request to reattempt the assessment\s+(.+?)\s+has been approved$/i,
      prefix: "Reattempt Request Approved: Your request to reattempt the assessment ",
      suffix: " has been approved",
    },
    {
      pattern: /^Your reattempt request for the assessment\s+(.+?)\s+has not been approved$/i,
      prefix: "Your reattempt request for the assessment ",
      suffix: " has not been approved",
    },
    {
      pattern: /^Get Ready:\s*(.+?)\s+starts in 5 minutes$/i,
      prefix: "Get Ready: ",
      suffix: " starts in 5 minutes",
    },
    {
      pattern: /^You're Missing Out:\s*(.+?)\s+has already started$/i,
      prefix: "You're Missing Out: ",
      suffix: " has already started",
    },
    {
      pattern: /^(.+?)\s+is in session now$/i,
      prefix: "",
      suffix: " is in session now",
    },
  ];

  for (const template of templates) {
    const match = eventText.match(template.pattern);
    if (match) {
      return {
        className: match[1],
        prefix: template.prefix,
        suffix: template.suffix,
      };
    }
  }

  return null;
};

const parseLiveClassContext = (context: string) => {
  const startsAtMatch = context.match(/Starts at\s*(.+)$/i);
  const startsAtText = startsAtMatch ? `Starts at ${startsAtMatch[1].trim()}` : "";

  if (context.includes("•")) {
    const [modulePart] = context.split("•").map((part) => part.trim());
    const moduleName = modulePart.replace(/^Module:\s*/i, "").trim();
    return {
      moduleName,
      startsAtText,
    };
  }

  const moduleMatch = context.match(/Module:\s*(.+)$/i);
  const moduleName = moduleMatch ? moduleMatch[1].trim() : context;

  return {
    moduleName,
    startsAtText,
  };
};

const getNewContentTitleParts = (eventText: string) => {
  const match = eventText.match(/^New\s+(.+?)\s+has been added in the module\s+(.+)$/i);
  if (!match) {
    return null;
  }

  return {
    contentType: match[1].trim(),
    moduleName: match[2].trim(),
  };
};

const getAttendanceNudgeTitleParts = (eventText: string) => {
  const match = eventText.match(
    /^Your attendance in the course\s+(.+?)\s+has fallen below 65%\.\s+Attend upcoming sessions and stay engaged with the learning material to improve your progress\.$/i,
  );
  if (!match) {
    return null;
  }

  return {
    courseName: match[1].trim(),
  };
};

const getEngagementNudgeTitleParts = (eventText: string) => {
  const d3Match = eventText.match(/^You have not accessed the\s+(.+?)\s+added in the module\s+(.+)$/i);
  if (d3Match) {
    return {
      type: "d3" as const,
      contentType: d3Match[1].trim(),
      moduleName: d3Match[2].trim(),
    };
  }

  const d6Match = eventText.match(/^Don't miss the\s+(.+?)\s+added in the module\s+(.+)$/i);
  if (d6Match) {
    return {
      type: "d6" as const,
      contentType: d6Match[1].trim(),
      moduleName: d6Match[2].trim(),
    };
  }

  const d9Match = eventText.match(/^Continue your learning with the\s+(.+?)\s+added in the module\s+(.+)$/i);
  if (d9Match) {
    return {
      type: "d9" as const,
      contentType: d9Match[1].trim(),
      moduleName: d9Match[2].trim(),
    };
  }

  return null;
};

const renderNotificationTitle = (eventText: string) => {
  const engagementNudgeParts = getEngagementNudgeTitleParts(eventText);
  if (engagementNudgeParts) {
    return (
      <>
        {engagementNudgeParts.type === "d3"
          ? "You have not accessed the "
          : engagementNudgeParts.type === "d6"
            ? "Don't miss the "
            : "Continue your learning with the "}
        <span className="font-semibold">{engagementNudgeParts.contentType}</span> added in the module{" "}
        <span className="font-semibold">{engagementNudgeParts.moduleName}</span>
      </>
    );
  }

  const newContentParts = getNewContentTitleParts(eventText);
  if (!newContentParts) {
    return eventText;
  }

  return (
    <>
      New <span className="font-semibold">{newContentParts.contentType}</span> has been added in the module{" "}
      <span className="font-semibold">{newContentParts.moduleName}</span>
    </>
  );
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");

  const filteredNotifications = useMemo(() => {
    return getNotificationsForFilter(notifications, activeFilter);
  }, [activeFilter, notifications]);

  const handlePrimaryAction = (notification: StudentNotification) => {
    markAsRead(notification.id);
    if (notification.actionLink) {
      navigate(notification.actionLink);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mx-auto w-full lg:w-4/5">
          <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Notifications
              </h1>
              <p className="text-base text-muted-foreground">
                Track new updates, reminders, live activity, and progress signals across your learning journey.
              </p>
            </div>
          </section>

          <section className="mb-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {notificationFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    activeFilter === filter.value
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="mx-auto w-full lg:w-4/5">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-4dp">
              <div>
                {filteredNotifications.map((notification, index) => {
                  const Icon = getNotificationIcon(notification);
                  const isStartedLiveClass = isStartedLiveClassNotification(notification);
                  const isUnread = !notification.isRead;
                  const isStructuredLearningAlert =
                    notification.category === "live_classes" || notification.category === "assessment";
                  const liveClassTitleParts = getLiveClassTitleParts(notification.event);
                  const engagementNudgeTitleParts = getEngagementNudgeTitleParts(notification.event);
                  const newContentTitleParts = getNewContentTitleParts(notification.event);
                  const attendanceNudgeTitleParts = getAttendanceNudgeTitleParts(notification.event);
                  const liveClassContext = parseLiveClassContext(notification.context);
                  const hasStructuredContext = Boolean(liveClassContext.moduleName || liveClassContext.startsAtText);
                  const hasPlainContext = Boolean(notification.context?.trim());
                  const hasSecondaryLine = isStructuredLearningAlert ? hasStructuredContext : hasPlainContext;

                  return (
                    <div key={notification.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          if (isUnread) {
                            markAsRead(notification.id);
                          }
                        }}
                        onKeyDown={(event) => {
                          if ((event.key === "Enter" || event.key === " ") && isUnread) {
                            event.preventDefault();
                            markAsRead(notification.id);
                          }
                        }}
                        className={cn(
                          "flex gap-4 rounded-md px-6 py-5 transition-colors hover:bg-muted/40",
                          isUnread && "bg-primary-light dark:bg-primary/20 ring-1 ring-primary/15",
                          hasSecondaryLine ? "items-start" : "items-center",
                        )}
                      >
                        <div className={cn("flex-shrink-0", hasSecondaryLine && "mt-0.5")}>
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full",
                              getNotificationIconShellClasses(notification),
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              {isStructuredLearningAlert ? (
                                <>
                                  <p className="text-base leading-6 text-foreground">
                                    {liveClassTitleParts ? (
                                      <>
                                        {liveClassTitleParts.prefix}
                                        <span className="font-semibold">{liveClassTitleParts.className}</span>
                                        {liveClassTitleParts.suffix}
                                      </>
                                    ) : (
                                      notification.event
                                    )}
                                  </p>

                                  {(liveClassContext.moduleName || liveClassContext.startsAtText) && (
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                      {liveClassContext.moduleName && (
                                        <>
                                          <span className="font-semibold">Module:</span>{" "}
                                          {liveClassContext.moduleName}
                                        </>
                                      )}
                                      {liveClassContext.moduleName && liveClassContext.startsAtText && "  •  "}
                                      {liveClassContext.startsAtText && (
                                        <span className="font-semibold">{liveClassContext.startsAtText}</span>
                                      )}
                                    </p>
                                  )}

                                  {shouldShowAction(notification) && (
                                    <Button
                                      className={cn("mt-3 shadow-4dp", isStartedLiveClass && "mt-3")}
                                      size="sm"
                                      onClick={() => handlePrimaryAction(notification)}
                                    >
                                      {notification.actionLabel}
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <>
                                  {engagementNudgeTitleParts ? (
                                    <p className="font-heading text-[1.05rem] font-normal leading-6 text-foreground">
                                      {renderNotificationTitle(notification.event)}
                                    </p>
                                  ) : newContentTitleParts ? (
                                    <p className="font-heading text-[1.05rem] font-normal leading-6 text-foreground">
                                      New <span className="font-semibold">{newContentTitleParts.contentType}</span> has been added in the
                                      module <span className="font-semibold">{newContentTitleParts.moduleName}</span>
                                    </p>
                                  ) : attendanceNudgeTitleParts ? (
                                    <p className="font-heading text-[1.05rem] font-normal leading-6 text-foreground">
                                      Your attendance in the course <span className="font-semibold">{attendanceNudgeTitleParts.courseName}</span>{" "}
                                      has fallen below 65%. Attend upcoming sessions and stay engaged with the learning material to improve
                                      your progress.
                                    </p>
                                  ) : (
                                    <h3 className="font-heading text-[1.05rem] font-semibold leading-6 text-foreground">
                                      {notification.event}
                                    </h3>
                                  )}

                                  {notification.context && (
                                    <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                                      {notification.context.startsWith("Module:") ? (
                                        <>
                                          <span className="font-semibold">Module:</span>{" "}
                                          {notification.context.replace(/^Module:\s*/i, "")}
                                        </>
                                      ) : (
                                        notification.context
                                      )}
                                    </p>
                                  )}

                                  {shouldShowAction(notification) && (
                                    <Button className="mt-3 shadow-4dp" size="sm" onClick={() => handlePrimaryAction(notification)}>
                                      {notification.actionLabel}
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>

                            <div className="shrink-0 pl-4">
                              <div className="flex items-center gap-2">
                                {isUnread && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                <div
                                  className={cn(
                                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[8px] bg-muted px-2 py-1 text-muted-foreground",
                                    isStartedLiveClass ? "text-[14px]" : "text-[11px]",
                                  )}
                                >
                                  <Clock3 className={cn(isStartedLiveClass ? "h-3.5 w-3.5" : "h-3 w-3")} />
                                  {getRelativeNotificationTime(notification.timestamp)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < filteredNotifications.length - 1 && <div className="mx-6 h-px bg-border" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Card className="border-dashed shadow-soft">
            <CardContent className="flex min-h-[18rem] flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="rounded-2xl bg-muted p-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-xl font-semibold">No matching notifications</h2>
              <p className="max-w-md text-sm text-muted-foreground">Try switching filters to see more updates.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;
