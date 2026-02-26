
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users } from "lucide-react";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import { Course } from "@/lib/mockData";

interface CourseInfoBannerProps {
  course: Course;
}

const PREVIEW_WORD_COUNT = 25;

const CourseInfoBanner = ({ course }: CourseInfoBannerProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const words = course.description.split(' ');
  const needsViewMore = words.length > PREVIEW_WORD_COUNT;
  const previewText = words.slice(0, PREVIEW_WORD_COUNT).join(' ');
  const extraText = needsViewMore ? words.slice(PREVIEW_WORD_COUNT).join(' ') : '';

  // Inline to avoid component remount killing the CSS transition
  const descriptionBlock = (
    <div className="mb-4">
      <p className="text-base md:text-lg text-foreground">
        {previewText}
        {needsViewMore && !showFullDescription && '...'}
      </p>
      {needsViewMore && (
        <>
          {/* grid-template-rows 0fr→1fr animates height; opacity fades in content */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: showFullDescription ? '1fr' : '0fr',
              transitionProperty: 'grid-template-rows',
              transitionDuration: '350ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <p
                className="text-base md:text-lg text-foreground mt-0 pt-0"
                style={{
                  opacity: showFullDescription ? 1 : 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '300ms',
                  transitionTimingFunction: 'ease',
                }}
              >
                {extraText}
              </p>
            </div>
          </div>
          <Button
            variant="link"
            className="text-primary dark:text-secondary mt-1"
            onClick={() => setShowFullDescription(prev => !prev)}
          >
            {showFullDescription ? 'View Less' : 'View More'}
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full rounded-b-lg shadow-8dp bg-gradient-to-br from-primary/8 via-background to-accent/8 border-b border-border/50 animate-slide-down-banner">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="flex-shrink-0">
            <img
              src={course.image}
              alt={course.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">{course.name}</h1>
                {descriptionBlock}
                <div className="mb-4">
                  <span className="font-medium">Instructor: {course.instructor.name}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm text-muted-foreground">In Collaboration With</p>
                <img
                  src="/lovable-uploads/09118b9e-00df-4356-a333-707d5733862f.png"
                  alt="AFE Brand"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mb-6">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-40 rounded-lg object-cover mb-4"
          />
          <h1 className="text-2xl font-heading font-bold mb-2">{course.name}</h1>
          {descriptionBlock}
          <div className="mb-4">
            <span className="font-medium">Instructor: {course.instructor.name}</span>
          </div>
          <div className="flex flex-col items-end gap-1 mb-4">
            <p className="text-sm text-muted-foreground">In Collaboration With</p>
            <img
              src="/lovable-uploads/09118b9e-00df-4356-a333-707d5733862f.png"
              alt="AFE Brand"
              className="h-12"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <AnimatedProgressBar progress={course.progress} />
        </div>

        {/* Batch Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="p-2">
              <BookOpen className="w-4 h-4" />
            </Badge>
            <div>
              <p className="text-sm text-muted-foreground">Batch</p>
              <p className="font-medium">{course.batchName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="p-2">
              <Clock className="w-4 h-4" />
            </Badge>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="p-2">
              <Users className="w-4 h-4" />
            </Badge>
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="font-medium">{course.studentsEnrolled} enrolled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoBanner;
