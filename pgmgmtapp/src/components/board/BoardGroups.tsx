// src/components/board/BoardGroups.tsx
import { Group } from '@/data/board-data'
import { BoardGroup } from './BoardGroup'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BoardGroupsProps {
  groups: Group[]
  onToggleGroup: (groupId: string) => void
  onAddTask: (groupId: string) => void
}

export function BoardGroups({ groups, onToggleGroup, onAddTask }: BoardGroupsProps) {
  return (
    <div className="flex flex-col">
      {/* Groups */}
      {groups.map(group => (
        <BoardGroup
          key={group.id}
          group={group}
          onToggle={onToggleGroup}
          onAddTask={onAddTask}
        />
      ))}

      {/* Add New Group */}
      <div className="px-4 py-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 text-gray-500 hover:text-gray-900"
            >
              <Plus className="h-4 w-4" />
              Add new group
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a new group to organize your items</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}