import { useEffect, useState } from "react";
import { X, Video, BookOpen, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateTime } from "@/lib/utils";

interface UpcomingItem {
  id: string;
  title: string;
  type: 'class' | 'assessment' | 'assignment';
  dateTime: Date;
  canStart: boolean;
  actionText: string;
}

interface ViewAllUpcomingModalProps {
  isOpen: boolean;
  onClose: () => void;
  upcomingItems: UpcomingItem[];
}

const ViewAllUpcomingModal = ({ isOpen, onClose, upcomingItems }: ViewAllUpcomingModalProps) => {
  // Animate in/out state
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  // Handle open/close animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      // rAF to ensure DOM is painted before triggering transition
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRendered(false), 220);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!rendered) return null;

  const getItemIconWithBackground = (type: string) => {
    switch (type) {
      case 'class':
        return (
          <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-secondary" />
          </div>
        );
      case 'assessment':
        return (
          <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-warning" />
          </div>
        );
      case 'assignment':
        return (
          <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-info" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-muted-light flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-muted-foreground" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${visible ? 220 : 180}ms ease-${visible ? 'out' : 'in'}`,
        }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-2xl bg-background rounded-lg shadow-lg border border-border flex flex-col max-h-[85vh]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: `opacity ${visible ? 220 : 180}ms ease-${visible ? 'out' : 'in'}, transform ${visible ? 220 : 180}ms ease-${visible ? 'out' : 'in'}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-semibold">All Upcoming Items</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-[opacity,transform] duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="h-[60vh] px-6 py-4">
          <div className="space-y-4">
            {upcomingItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getItemIconWithBackground(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.type === 'class' && `Scheduled on ${formatDateTime(item.dateTime)}`}
                      {item.type === 'assessment' && `Starts on ${formatDateTime(item.dateTime)}`}
                      {item.type === 'assignment' && `Due on ${formatDateTime(item.dateTime)}`}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      size="sm"
                      variant="link"
                      disabled={!item.canStart}
                      className="text-primary"
                    >
                      {item.canStart ? item.actionText : getTimeRemaining(item.dateTime)}
                    </Button>
                  </div>
                </div>
                {index < upcomingItems.length - 1 && (
                  <div className="border-t border-border mt-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ViewAllUpcomingModal;
