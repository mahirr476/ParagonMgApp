// src/components/board/components/AddTaskButton.tsx
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AddTaskButtonProps {
  onClick: () => void
  className?: string
}

export function AddTaskButton({ onClick, className }: AddTaskButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className={cn(
            "gap-2 text-gray-500 hover:text-gray-900",
            className
          )}
        >
          <Plus className="h-4 w-4" />
          Add task
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add a new task</TooltipContent>
    </Tooltip>
  )
}