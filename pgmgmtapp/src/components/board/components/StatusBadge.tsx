// src/components/board/components/StatusBadge.tsx
import { cn } from "@/lib/utils"
import { TaskStatus } from "@/data/board-data"

interface StatusBadgeProps {
  status: TaskStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case 'Done':
        return 'bg-[#00c875] text-white'
      case 'Working on it':
        return 'bg-[#fdab3d] text-white'
      case 'Not Started':
        return 'bg-[#c4c4c4] text-white'
      case 'Stuck':
        return 'bg-[#e2445c] text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <span className={cn(
      "px-2 py-1 rounded-md text-sm font-medium inline-flex items-center",
      getStatusStyle(status),
      className
    )}>
      {status}
    </span>
  )
}