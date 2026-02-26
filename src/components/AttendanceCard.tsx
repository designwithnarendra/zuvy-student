import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap, Video, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

interface RecentClass {
  id: string;
  name: string;
  status: 'attended' | 'absent';
  date: Date;
  instructor: string;
}

interface AttendanceStats {
  percentage: number;
  attended: number;
  total: number;
  recentClasses: RecentClass[];
}

interface AttendanceCardProps {
  attendanceStats: AttendanceStats;
  courseId: string;
}

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: RecentClass[];
  courseId: string;
}

const AttendanceModal = ({ isOpen, onClose, classes, courseId }: AttendanceModalProps) => {
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  // Open: mount first, then trigger transition on next paint
  // Close: reverse transition, then unmount after it finishes
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
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

  const openDuration = 220;
  const closeDuration = 180;
  const duration = visible ? openDuration : closeDuration;
  const easing = visible ? 'ease-out' : 'ease-in';

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(date);

  const allClasses = [
    ...classes,
    { id: "4", name: "JavaScript Fundamentals", status: 'attended' as const, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" },
    { id: "5", name: "HTML & CSS Basics", status: 'attended' as const, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" },
    { id: "6", name: "Web Development Intro", status: 'absent' as const, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${duration}ms ${easing}`,
        }}
        onClick={onClose}
      />

      {/* Modal panel: rises 20px + scales 0.98→1 on open, reverses on close */}
      <div
        className="relative z-10 w-full max-w-2xl bg-background rounded-lg shadow-lg border border-border flex flex-col max-h-[80vh]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-semibold">Full Attendance Record</h2>
          {/* X rotates 90° on hover */}
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-[opacity,transform] duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content via ScrollArea */}
        <ScrollArea className="flex-1 px-6 py-2">
          {allClasses.map((classItem, index, array) => (
            <div key={classItem.id}>
              <div className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <h4 className="text-base font-medium">{classItem.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(classItem.date)} • {classItem.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={classItem.status === 'attended' ? "text-success border-success" : "text-destructive border-destructive"}>
                    {classItem.status === 'attended' ? 'Present' : 'Absent'}
                  </Badge>
                  <Link
                    to={`/course/${courseId}/curriculum`}
                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary-light transition-colors"
                    title="View Class Recording"
                  >
                    <Video className="w-4 h-4 text-primary transition-transform duration-150 group-hover:scale-125" />
                  </Link>
                </div>
              </div>
              {index < array.length - 1 && <div className="border-t border-border" />}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

const AttendanceCard = ({ attendanceStats, courseId }: AttendanceCardProps) => {
  const [animatedPct, setAnimatedPct] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setAnimatedPct(attendanceStats.percentage);
      return;
    }

    const target = attendanceStats.percentage;
    const duration = 1200;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = -(Math.cos(Math.PI * t) - 1) / 2;
      setAnimatedPct(Math.round(eased * target));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [attendanceStats.percentage]);

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(date);

  return (
    <Card className="shadow-4dp">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Attendance</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {animatedPct}%
          </div>
          <p className="text-sm text-muted-foreground">
            {attendanceStats.attended} of {attendanceStats.total} classes attended
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-sm">Recent Classes</h4>
          {attendanceStats.recentClasses.length > 0 ? (
            attendanceStats.recentClasses.slice(0, 3).map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{classItem.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(classItem.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={classItem.status === 'attended' ? "text-success border-success" : "text-destructive border-destructive"}>
                    {classItem.status === 'attended' ? 'Present' : 'Absent'}
                  </Badge>
                  <Link
                    to={`/course/${courseId}/curriculum`}
                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary-light transition-colors"
                    title="View Class Recording"
                  >
                    <Video className="w-4 h-4 text-primary transition-transform duration-150 group-hover:scale-125" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <GraduationCap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No Classes</p>
            </div>
          )}
        </div>

        {attendanceStats.recentClasses.length > 0 && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="text-primary"
              onClick={() => setIsModalOpen(true)}
            >
              View Full Attendance
            </Button>
          </div>
        )}
      </CardContent>

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classes={attendanceStats.recentClasses}
        courseId={courseId}
      />
    </Card>
  );
};

export default AttendanceCard;
