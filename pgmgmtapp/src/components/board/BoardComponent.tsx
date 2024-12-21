// src/components/board/BoardComponent.tsx
"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BoardHeader } from './BoardHeader'
import { BoardColumns } from './BoardColumns'
import { BoardGroups } from './BoardGroups'
import { Board, Group } from '@/types/board'

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

  const handleToggleGroup = (groupId: string) => {
    const updatedGroups = board.groups.map(group => 
      group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
    )
    onBoardUpdate({ ...board, groups: updatedGroups })
  }

  const handleUpdateGroup = (groupId: string, updates: Partial<Group>) => {
    const updatedGroups = board.groups.map(group => 
      group.id === groupId ? { ...group, ...updates } : group
    )
    onBoardUpdate({ ...board, groups: updatedGroups })
  }

  return (
    <Card className={cn(
      "w-full shadow-none border-none bg-background px-4",
      className
    )}>
      <BoardHeader 
        isExpanded={isExpanded} 
        onViewToggle={() => setIsExpanded(!isExpanded)}
        selectedBoard={board}
        onBoardSelect={onBoardUpdate}
      />
      <BoardGroups 
        groups={board.groups}
        onToggleGroup={handleToggleGroup}
        onUpdateGroup={handleUpdateGroup}
        board={board}
      />
    </Card>
  )
}

export default BoardComponent