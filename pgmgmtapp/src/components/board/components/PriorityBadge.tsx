// src/components/board/components/PriorityBadge.tsx
import { cn } from "@/lib/utils"
import { TaskPriority } from "@/data/board-data"

interface PriorityBadgeProps {
  priority: TaskPriority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getPriorityStyle = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-[#401694] text-white'
      case 'Medium':
        return 'bg-[#0073ea] text-white'
      case 'Low':
        return 'bg-[#579bfc] text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <span className={cn(
      "px-2 py-1 rounded-md text-sm font-medium inline-flex items-center",
      getPriorityStyle(priority),
      className
    )}>
      {priority}
    </span>
  )
}