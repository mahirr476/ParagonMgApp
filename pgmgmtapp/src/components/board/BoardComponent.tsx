// src/components/board/BoardComponent.tsx
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Search,
  User2,
  Filter,
  ArrowUpDown,
  Eye,
  Users,
  MoreHorizontal,
  Clock
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SAMPLE_BOARD_DATA,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  BOARD_COLUMNS,
  type Group,
  type Task,
  type TaskStatus,
  type TaskPriority
} from '@/data/board-data'

interface BoardComponentProps {
  className?: string
}

const BoardComponent = ({ className }: BoardComponentProps) => {
  const [groups, setGroups] = useState<Group[]>(SAMPLE_BOARD_DATA)

  const toggleGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
    ))
  }

  return (
    <Card className={cn("w-full shadow-none border-none", className)}>
      {/* Action Bar */}
      <div className="flex items-center gap-2 p-4 border-b">
        <Button className="gap-2">
          New task
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-2 px-4 py-2 bg-gray-50">
        <div className="flex items-center justify-center">
          <Checkbox />
        </div>
        {BOARD_COLUMNS.map(column => (
          <div 
            key={column.id} 
            className={cn(
              "font-medium flex items-center gap-1",
              column.hasSort && "cursor-pointer hover:text-blue-600"
            )}
          >
            {column.title}
            {column.hasSort && <ChevronDown className="h-3 w-3" />}
          </div>
        ))}
        <div></div>
      </div>

      {/* Groups */}
      {groups.map(group => (
        <div key={group.id}>
          {/* Group Header */}
          <div 
            className={cn(
              "flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer",
              group.color
            )}
            onClick={() => toggleGroup(group.id)}
          >
            {group.isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span className="font-medium ml-2">{group.title}</span>
          </div>

          {/* Group Tasks */}
          {group.isExpanded && group.tasks.map(task => (
            <div 
              key={task.id}
              className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] gap-2 px-4 py-2 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center">
                <Checkbox />
              </div>
              <div>{task.title}</div>
              <div>
                {task.owner && (
                  <Avatar className="h-6 w-6">
                    <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center text-xs">
                      {task.owner[0]}
                    </div>
                  </Avatar>
                )}
              </div>
              <div>
                <span className={cn(
                  "px-2 py-1 rounded-md text-sm",
                  STATUS_CONFIG[task.status].color
                )}>
                  {task.status}
                </span>
              </div>
              <div className="text-sm">
                {task.dueDate}
              </div>
              <div>
                <span className={cn(
                  "px-2 py-1 rounded-md text-sm",
                  PRIORITY_CONFIG[task.priority].color
                )}>
                  {task.priority}
                </span>
              </div>
              <div>
                <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-sm">
                  {task.timeline}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add Task Button */}
          <div className="px-4 py-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </div>
      ))}
    </Card>
  )
}

export default BoardComponent