// src/components/board/components/StatusBadge.tsx
import { cn } from "@/lib/utils"
import { TaskStatus } from "@/types/board"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { STATUS_CONFIG } from "@/data/board-data"

interface StatusBadgeProps {
  status: TaskStatus
  className?: string
  isEditable?: boolean
  onStatusChange?: (newStatus: TaskStatus) => void
}

export function StatusBadge({ 
  status, 
  className,
  isEditable = true,
  onStatusChange 
}: StatusBadgeProps) {
  if (isEditable) {
    return (
      <Select 
        value={status} 
        onValueChange={(value) => onStatusChange?.(value as TaskStatus)}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-8 border-0 focus:ring-0 focus:ring-offset-0",
            "hover:opacity-80 transition-opacity",
            STATUS_CONFIG[status].color,
            STATUS_CONFIG[status].textColor,
          )}
        >
          <span className="text-sm font-medium">{status}</span>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(STATUS_CONFIG).map(([value, config]) => (
            <SelectItem
              key={value}
              value={value}
              className={cn(
                "text-sm font-medium",
                config.color,
                config.textColor
              )}
            >
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <span 
      className={cn(
        "w-full h-8 px-3 flex items-center justify-center rounded",
        "text-sm font-medium",
        STATUS_CONFIG[status].color,
        STATUS_CONFIG[status].textColor,
        className
      )}
    >
      {status}
    </span>
  )
}