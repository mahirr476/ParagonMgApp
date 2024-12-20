// src/components/board/BoardGroup.tsx
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BoardRow } from "./BoardRow"
import { Group } from "@/data/board-data"

interface BoardGroupProps {
  group: Group
  onToggle: (groupId: string) => void
  onAddTask: (groupId: string) => void  // Added this prop
}

export function BoardGroup({ group, onToggle, onAddTask }: BoardGroupProps) {
  return (
    <div>
      {/* Group Header */}
      <div 
        className={cn(
          "flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer",
          group.color,
        )}
        onClick={() => onToggle(group.id)}
      >
        <Button
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent"
        >
          {group.isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span className="font-medium ml-2">{group.title}</span>
      </div>

      {/* Group Tasks */}
      {group.isExpanded && (
        <>
          {group.tasks.map((task) => (
            <BoardRow key={task.id} task={task} />
          ))}

          {/* Add Task Button */}
          <div className="px-4 py-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-gray-500 hover:text-gray-900"
              onClick={() => onAddTask(group.id)}  // Added onClick handler
            >
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </>
      )}
    </div>
  )
}