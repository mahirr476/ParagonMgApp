// src/components/board/BoardRow.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Task } from '@/data/board-data'

interface BoardRowProps {
  task: Task
}

export function BoardRow({ task }: BoardRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-2 px-4 py-2 hover:bg-gray-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div className="flex items-center justify-center">
        <Checkbox />
      </div>

      {/* Task Title */}
      <div className="flex items-center">
        {task.title}
      </div>

      {/* Owner */}
      <div className="flex items-center">
        {task.owner && (
          <Avatar className="h-6 w-6">
            <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center text-xs">
              {task.owner[0].toUpperCase()}
            </div>
          </Avatar>
        )}
      </div>

      {/* Status */}
      <div>
        <span className={cn(
          "px-2 py-1 rounded-md text-sm inline-flex items-center",
          task.status === 'Done' && "bg-green-500 text-white",
          task.status === 'Working on it' && "bg-orange-400 text-white",
          task.status === 'Not Started' && "bg-gray-400 text-white",
          task.status === 'Stuck' && "bg-red-500 text-white"
        )}>
          {task.status}
        </span>
      </div>

      {/* Due Date */}
      <div className="text-sm">
        {task.dueDate}
      </div>

      {/* Priority */}
      <div>
        <span className={cn(
          "px-2 py-1 rounded-md text-sm",
          task.priority === 'High' && "bg-indigo-900 text-white",
          task.priority === 'Medium' && "bg-blue-500 text-white",
          task.priority === 'Low' && "bg-blue-400 text-white"
        )}>
          {task.priority}
        </span>
      </div>

      {/* Timeline */}
      <div>
        <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-sm">
          {task.timeline}
        </span>
      </div>

      {/* Actions */}
      <div className={cn(
        "flex items-center justify-center",
        !isHovered && "opacity-0",
        "group-hover:opacity-100 transition-opacity"
      )}>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}