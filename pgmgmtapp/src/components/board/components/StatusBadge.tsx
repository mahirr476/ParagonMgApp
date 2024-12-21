// src/components/board/components/StatusBadge.tsx
import { cn } from "@/lib/utils"
import { TaskStatus } from "@/types/board"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

const STATUS_STYLES = {
  'Working on it': { bg: 'bg-[#fdab3d]', text: 'text-white' },
  'Done': { bg: 'bg-[#00c875]', text: 'text-white' },
  'Not Started': { bg: 'bg-[#c4c4c4]', text: 'text-white' },
  'Stuck': { bg: 'bg-[#e2445c]', text: 'text-white' }
} as const

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
  const statusOptions: TaskStatus[] = [
    'Done',
    'Working on it',
    'Stuck',
    'Not Started'
  ]

  if (isEditable) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full h-8 px-3 flex items-center justify-center rounded",
              "hover:opacity-90 transition-opacity",
              "font-medium text-sm",
              STATUS_STYLES[status].bg,
              STATUS_STYLES[status].text,
              className
            )}
          >
            {status}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex flex-col py-1">
            {statusOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                className={cn(
                  "w-full h-9 px-3 justify-center rounded-none",
                  "hover:opacity-90 transition-opacity",
                  "font-medium text-sm",
                  STATUS_STYLES[option].bg,
                  STATUS_STYLES[option].text
                )}
                onClick={() => onStatusChange?.(option)}
              >
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
        "w-full h-8 px-3 flex items-center justify-center rounded",
        "font-medium text-sm",
        STATUS_STYLES[status].bg,
        STATUS_STYLES[status].text,
        className
      )}
    >
      {status}
    </span>
  )
}