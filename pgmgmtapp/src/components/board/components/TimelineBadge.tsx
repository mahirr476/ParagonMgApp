// src/components/board/components/TimelineBadge.tsx
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface TimelineBadgeProps {
    timeline: { start: string; end: string }
    isDone?: boolean
    className?: string
  }
  
  export function TimelineBadge({ 
    timeline, 
    isDone, 
    className 
  }: TimelineBadgeProps) {
    const timelineText = `${timeline.start} - ${timeline.end}`;
  
    return (
      <span className={cn(
        "px-2 py-0.5 rounded-full text-sm font-medium inline-flex items-center gap-1",
        isDone ? "bg-[#e5f4ef] text-[#00854d]" : "bg-[#e6efff] text-[#0073ea]",
        className
      )}>
        {isDone && <Check className="h-3 w-3" />}
        {timelineText}
      </span>
    )
  }