
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, BookOpen, FileText, Clock } from "lucide-react";
import { useState } from "react";
import ViewAllUpcomingModal from "./ViewAllUpcomingModal";
import { formatDate, formatDateTime } from "@/lib/utils";

interface UpcomingItem {
  id: string;
  title: string;
  type: 'class' | 'assessment' | 'assignment';
  dateTime: Date;
  canStart: boolean;
  actionText: string;
}

interface WhatsNextCardProps {
  upcomingItems: UpcomingItem[];
}

const WhatsNextCard = ({ upcomingItems }: WhatsNextCardProps) => {
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  // Limit displayed items to 4
  const displayedItems = upcomingItems.slice(0, 4);
  const hasMoreItems = upcomingItems.length > 4;

  const formatDateRange = () => {
    const today = new Date();
    const seventhDay = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return `From ${formatDate(today).split(' ').slice(0, 2).join(' ')} to ${formatDate(seventhDay).split(' ').slice(0, 2).join(' ')}`;
  };

  const getItemIconWithBackground = (type: string) => {
    switch (type) {
      case 'class':
        return (
          <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center">
            <Video className="w-5 h-5 text-secondary dark:text-secondary-dark" />
          </div>
        );
      case 'assessment':
        return (
          <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-warning dark:text-warning-dark" />
          </div>
        );
      case 'assignment':
        return (
          <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center">
            <FileText className="w-5 h-5 text-info dark:text-info-dark" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-muted-light flex items-center justify-center">
            <Clock className="w-5 h-5 text-muted-foreground dark:text-foreground" />
          </div>
        );
    }
  };

  const getTimeRemaining = (dateTime: Date) => {
    const now = new Date();
    const timeDiff = dateTime.getTime() - now.getTime();

    if (timeDiff <= 0) return "Time passed";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `Starts in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Starts in ${minutes} minute${minutes > 1 ? 's' : ''}`;

    return "Starting soon";
  };

  return (
    <Card className="shadow-4dp">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">What's Next?</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDateRange()}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        {upcomingItems.length > 0 ? (
          <div className="space-y-3">
            {displayedItems.map((item, index) => (
              <div key={item.id}>
                {/* Row with hover green tint — no extra margin on hover */}
                <div className="flex items-start gap-4 rounded-md py-1">
                  <div className="flex-shrink-0 mt-1">
                    {getItemIconWithBackground(item.type)}
                  </div>
                  <div className="flex-1">
                    {/* Title with pulsing dot before it on first item */}
                    <div className="flex items-center gap-1.5 mb-2">
                      {index === 0 && (
                        <span
                          className="w-[7px] h-[7px] rounded-full flex-shrink-0 animate-pulse"
                          style={{ backgroundColor: '#D32F2F' }}
                        />
                      )}
                      <h4 className="font-bold text-base">{item.title}</h4>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground">
                        {item.type === 'class' && `Scheduled on ${formatDateTime(item.dateTime)}`}
                        {item.type === 'assessment' && `Starts on ${formatDateTime(item.dateTime)}`}
                        {item.type === 'assignment' && `Due on ${formatDateTime(item.dateTime)}`}
                      </p>
                    </div>
                    {/* CTA - Bottom right */}
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="link"
                        disabled={!item.canStart}
                        className="text-primary dark:text-secondary font-normal"
                      >
                        {item.canStart ? item.actionText : getTimeRemaining(item.dateTime)}
                      </Button>
                    </div>
                  </div>
                </div>
                {index < displayedItems.length - 1 && (
                  <div className="h-px bg-border w-full mt-3" />
                )}
              </div>
            ))}
            {hasMoreItems && (
              <div className="mt-4 pt-4 border-t border-border flex justify-center">
                <Button
                  variant="link"
                  className="text-primary dark:text-secondary"
                  onClick={() => setIsViewAllModalOpen(true)}
                >
                  View All Upcoming Items ({upcomingItems.length})
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nothing Scheduled</p>
          </div>
        )}
      </CardContent>

      {/* View All Modal */}
      <ViewAllUpcomingModal
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
        upcomingItems={upcomingItems}
      />
    </Card>
  );
};

export default WhatsNextCard;
