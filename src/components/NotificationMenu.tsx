import { useEffect, useRef, useState } from "react";
import {
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNotificationIcon, getNotificationIconShellClasses } from "@/lib/notificationVisuals";
import { getRelativeNotificationTime, StudentNotification } from "@/lib/notifications";
import { cn } from "@/lib/utils";

interface NotificationMenuProps {
  notifications: StudentNotification[];
  unreadCount: number;
  onAction: (notification: StudentNotification) => void;
  onMarkAllAsRead: () => void;
}

const shouldShowAction = (notification: StudentNotification) =>
  notification.interactionType !== "informational" && Boolean(notification.actionLabel && notification.actionLink);

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
  if (newContentParts) {
    return (
      <>
        New <span className="font-semibold">{newContentParts.contentType}</span> has been added in the module{" "}
        <span className="font-semibold">{newContentParts.moduleName}</span>
      </>
    );
  }

  const attendanceNudgeParts = getAttendanceNudgeTitleParts(eventText);
  if (attendanceNudgeParts) {
    return (
      <>
        Your attendance in the course <span className="font-semibold">{attendanceNudgeParts.courseName}</span> has fallen below
        65%. Attend upcoming sessions and stay engaged with the learning material to improve your progress.
      </>
    );
  }

  return eventText;
};

const NotificationMenu = ({
  notifications,
  unreadCount,
  onAction,
  onMarkAllAsRead,
}: NotificationMenuProps) => {
  const navigate = useNavigate();
  const visibleNotifications = notifications.slice(0, 5);
  const [showBellWiggle, setShowBellWiggle] = useState(false);
  const hasPlayedBellWiggle = useRef(false);

  useEffect(() => {
    if (unreadCount <= 0 || hasPlayedBellWiggle.current) {
      return;
    }

    hasPlayedBellWiggle.current = true;
    setShowBellWiggle(true);

    const timeoutId = window.setTimeout(() => {
      setShowBellWiggle(false);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [unreadCount]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Open notifications"
        >
          <Bell className={cn("h-4 w-4", showBellWiggle && "animate-bell-wiggle")} />
          {unreadCount > 0 && (
            <>
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="sr-only">{unreadCount} unread notifications</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[25rem] overflow-hidden rounded-lg border border-border/70 bg-popover p-0 shadow-16dp"
        sideOffset={4}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">Notifications</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="text-xs text-muted-foreground"
          >
            Mark all read
          </Button>
        </div>

        <div
          className={cn(
            "max-h-[24rem] overflow-y-auto scrollbar-hide px-3 pb-2",
            visibleNotifications.length === 0 && "h-56",
          )}
        >
          <div className="space-y-0">
            {visibleNotifications.length > 0 ? (
              visibleNotifications.map((notification) => (
                <div key={notification.id}>
                  <div className="flex gap-4 rounded-md px-3 py-4 transition-colors hover:bg-muted/40">
                    <div className="mt-0.5 flex-shrink-0">
                      {(() => {
                        const Icon = getNotificationIcon(notification);
                        return (
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full",
                              getNotificationIconShellClasses(notification),
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                        );
                      })()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {(() => {
                            const isStructuredLearningAlert =
                              notification.category === "live_classes" || notification.category === "assessment";
                            const liveClassTitleParts = getLiveClassTitleParts(notification.event);
                            const liveClassContext = parseLiveClassContext(notification.context);
                            const hasStructuredContext = Boolean(liveClassContext.moduleName || liveClassContext.startsAtText);
                            const hasPlainContext = Boolean(notification.context?.trim());

                            if (isStructuredLearningAlert) {
                              return (
                                <>
                                  <p className="text-sm leading-6 text-foreground">
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

                                  {hasStructuredContext && (
                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
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
                                </>
                              );
                            }

                            return (
                              <>
                                <p className={cn("text-sm leading-6 text-foreground", hasPlainContext ? "font-normal" : "font-normal")}>
                                  {renderNotificationTitle(notification.event)}
                                </p>
                                {hasPlainContext && (
                                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
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
                              </>
                            );
                          })()}
                        </div>
                        {!notification.isRead && <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-primary" />}
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground/75">
                        {getRelativeNotificationTime(notification.timestamp)}
                      </div>

                      {shouldShowAction(notification) && (
                        <div className="mt-3 flex justify-start">
                          <Button
                            size="sm"
                            className="shadow-4dp"
                            onClick={() => onAction(notification)}
                          >
                            {notification.actionLabel}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
                <Bell className="h-8 w-8 text-muted-foreground" />
                <p className="font-heading text-base font-semibold">No notifications yet</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  When new updates arrive, they will show up here first.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 text-center">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-normal text-primary dark:text-secondary"
            onClick={() => navigate("/notifications")}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
