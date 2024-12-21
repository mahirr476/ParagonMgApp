// src/components/board/BoardComponent.tsx
"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BoardHeader } from './BoardHeader'
import { BoardColumns } from './BoardColumns'
import { BoardGroups } from './BoardGroups'
import { Board } from '@/types/board'

interface BoardComponentProps {
  className?: string
  board: Board
  onBoardUpdate: (board: Board) => void
}

const BoardComponent = ({ 
  className, 
  board, 
  onBoardUpdate 
}: BoardComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!board) {
    return null // Or some loading state/error message
  }

  const handleToggleGroup = (groupId: string) => {
    const updatedGroups = board.groups.map(group => 
      group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
    )
    onBoardUpdate({ ...board, groups: updatedGroups })
  }

  const handleAddTask = (groupId: string) => {
    // TODO: Implement add task functionality
    console.log('Add task to group:', groupId)
  }

  return (
    <Card className={cn(
      "w-full shadow-none border-none bg-white",
      className
    )}>
      <BoardHeader 
        isExpanded={isExpanded} 
        onViewToggle={() => setIsExpanded(!isExpanded)}
        selectedBoard={board}
        onBoardSelect={onBoardUpdate}
      />
      <BoardColumns columns={board.columns} />
      <BoardGroups 
        groups={board.groups}
        onToggleGroup={handleToggleGroup}
        onAddTask={handleAddTask}
      />
    </Card>
  )
}

export default BoardComponent