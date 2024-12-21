// src/components/board/components/PriorityBadge.tsx
import { cn } from "@/lib/utils"
import { TaskPriority } from "@/types/board"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { PRIORITY_CONFIG } from "@/data/board-data"

interface PriorityBadgeProps {
  priority: TaskPriority
  className?: string
  isEditable?: boolean
  onPriorityChange?: (newPriority: TaskPriority) => void
}

export function PriorityBadge({ 
  priority, 
  className,
  isEditable = true,
  onPriorityChange 
}: PriorityBadgeProps) {
  if (isEditable) {
    return (
      <Select 
        value={priority} 
        onValueChange={(value) => onPriorityChange?.(value as TaskPriority)}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-8 border-0 focus:ring-0 focus:ring-offset-0",
            "hover:opacity-80 transition-opacity",
            PRIORITY_CONFIG[priority].color,
            PRIORITY_CONFIG[priority].textColor,
          )}
        >
          <span className="text-sm font-medium">{priority}</span>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PRIORITY_CONFIG).map(([value, config]) => (
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
        PRIORITY_CONFIG[priority].color,
        PRIORITY_CONFIG[priority].textColor,
        className
      )}
    >
      {priority}
    </span>
  )
}