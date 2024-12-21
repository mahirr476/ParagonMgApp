// src/components/board/BoardGroups.tsx
import { BoardGroup } from './BoardGroup'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Board, Group } from '@/types/board'


interface BoardGroupsProps {
  groups: Group[]
  board: Board
  onToggleGroup: (groupId: string) => void
  onUpdateGroup: (groupId: string, updates: Partial<Group>) => void
}

export function BoardGroups({ groups, board, onToggleGroup, onUpdateGroup }: BoardGroupsProps) {
  const handleAddGroup = () => {
    // TODO: Implement add group functionality
    console.log('Add new group')
  }

  return (
    <div className="flex flex-col">
      {/* Groups */}

      {groups.map(group => (
        <BoardGroup
          key={group.id}
          group={group}
          onToggle={onToggleGroup}
          onUpdateGroup={onUpdateGroup}
          board={board}
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
              onClick={handleAddGroup}
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