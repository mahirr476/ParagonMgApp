// src/components/board/BoardGroup.tsx
import { useState } from "react"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BoardRow } from "./BoardRow"
import { Group, Task, Board } from "@/types/board"
import { BoardColumns } from "./BoardColumns"

interface BoardGroupProps {
  group: Group
  board: Board
  onToggle: (groupId: string) => void
  onUpdateGroup: (groupId: string, updates: Partial<Group>) => void
}

export function BoardGroup({ group, board, onToggle, onUpdateGroup }: BoardGroupProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)

  const handleUpdateTask = (updatedTask: Task) => {
    onUpdateGroup(group.id, {
      tasks: group.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    })
  }

  const handleDeleteTask = (taskId: string) => {
    onUpdateGroup(group.id, {
      tasks: group.tasks.filter(task => task.id !== taskId)
    })
  }

  return (
    <div className="border rounded-md mb-4">
      {/* Group Header */}
      <div 
        className={cn(
          "flex items-center px-4 py-2 bg-gray-50 cursor-pointer border-b",
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
        <div className="bg-white">
          <BoardColumns columns={board.columns} />
          {group.tasks.map((task) => (
            <BoardRow 
              key={task.id} 
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}

          {/* New Task Row */}
          {isAddingTask && (
            <BoardRow
              task={{
                id: `task-${Date.now()}`,
                title: '',
                owners: [],
                status: 'Not Started',
                priority: 'Medium',
                dueDate: undefined,
                dueDateTime: undefined,
                timeline: { start: '', end: '' }
              }}
              onUpdate={(newTask) => {
                onUpdateGroup(group.id, {
                  tasks: [...group.tasks, newTask]
                })
                setIsAddingTask(false)
              }}
              onDelete={() => setIsAddingTask(false)}
            />
          )}

          {/* Add Task Button */}
          <div className="px-4 py-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-gray-500 hover:text-gray-900"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}