// src/components/board/BoardColumns.tsx
import { 
    ChevronDown, 
    Info, 
    Plus
  } from "lucide-react"
  import { Checkbox } from "@/components/ui/checkbox"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import { Column } from '@/types/board'
  
  interface BoardColumnsProps {
    columns: Column[]
  }
  
  export function BoardColumns({ columns }: BoardColumnsProps) {
    return (
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] border-b bg-gray-50">
        {/* Checkbox Column */}
        <div className="flex items-center justify-center p-3">
          <Checkbox />
        </div>
  
        {/* Dynamic Columns */}
        {columns.map(column => (
          <div
            key={column.id}
            className={cn(
              "flex items-center gap-1 p-3",
              "font-medium text-sm text-gray-600"
            )}
          >
            <span className="truncate">{column.title}</span>
            
            <div className="flex items-center gap-0.5 ml-auto">
              {column.type === 'status' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronDown className="h-3 w-3 cursor-pointer hover:text-gray-900" />
                  </TooltipTrigger>
                  <TooltipContent>Sort by {column.title.toLowerCase()}</TooltipContent>
                </Tooltip>
              )}
              
              {(column.type === 'status' || column.type === 'date') && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-900" />
                  </TooltipTrigger>
                  <TooltipContent>Show {column.title.toLowerCase()} info</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
  
        {/* Add Column Button */}
        <div className="flex items-center justify-center p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-gray-500 hover:text-gray-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add column</TooltipContent>
          </Tooltip>
        </div>
      </div>
    )
  }