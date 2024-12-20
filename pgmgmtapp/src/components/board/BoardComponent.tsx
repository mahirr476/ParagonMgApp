// src/components/board/BoardComponent.tsx
"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BoardHeader } from './BoardHeader'
import { BoardColumns } from './BoardColumns'
import { BoardGroups } from './BoardGroups'
import { SAMPLE_BOARD_DATA, type Group } from '@/data/board-data'

interface BoardComponentProps {
  className?: string
}

const BoardComponent = ({ className }: BoardComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [groups, setGroups] = useState<Group[]>(SAMPLE_BOARD_DATA)

  const handleToggleGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
    ))
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
      />
      <BoardColumns />
      <BoardGroups 
        groups={groups}
        onToggleGroup={handleToggleGroup}
        onAddTask={handleAddTask}
      />
    </Card>
  )
}

export default BoardComponent