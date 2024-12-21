// src/components/board/components/PriorityBadge.tsx
import { cn } from "@/lib/utils"
import { TaskPriority, PRIORITY_STYLES } from "@/types/board"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Pencil, AlertTriangle } from "lucide-react"

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

  const priorityOptions: TaskPriority[] = Object.keys(PRIORITY_STYLES) as TaskPriority[];

  if (isEditable) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full h-8 px-3 flex items-center justify-center gap-1 rounded",
              "hover:opacity-90 transition-opacity",
              "font-medium text-sm",
              PRIORITY_STYLES[priority].bg,
              PRIORITY_STYLES[priority].text,
              className
            )}
          >
            {PRIORITY_STYLES[priority].icon && (
              <AlertTriangle className="h-3.5 w-3.5" />
            )}
            {priority}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex flex-col py-1">
            {priorityOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                className={cn(
                  "w-full h-9 px-3 justify-center gap-1 rounded-none",
                  "hover:opacity-90 transition-opacity",
                  "font-medium text-sm",
                  PRIORITY_STYLES[option].bg,
                  PRIORITY_STYLES[option].text
                )}
                onClick={() => onPriorityChange?.(option)}
              >
                {PRIORITY_STYLES[option].icon && (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                {option}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full h-9 px-3 justify-start rounded-none text-gray-700 hover:bg-gray-50"
            >
              <Pencil className="h-3.5 w-3.5 mr-2" />
              Edit Labels
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <span 
      className={cn(
        "w-full h-8 px-3 flex items-center justify-center gap-1 rounded",
        "font-medium text-sm",
        PRIORITY_STYLES[priority].bg,
        PRIORITY_STYLES[priority].text,
        className
      )}
    >
      {PRIORITY_STYLES[priority].icon && (
        <AlertTriangle className="h-3.5 w-3.5" />
      )}
      {priority}
    </span>
  )
}