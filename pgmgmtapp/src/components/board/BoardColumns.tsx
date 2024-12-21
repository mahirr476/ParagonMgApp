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
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] items-center gap-2 px-4 py-2 bg-[#f5f6f8] border-b">
        {/* Checkbox Column */}
        <div className="flex items-center justify-center">
          <Checkbox />
        </div>
  
        {/* Dynamic Columns */}
        {columns.map(column => (
          <div
            key={column.id}
            className={cn(
              "flex items-center gap-1 font-medium text-[13px] text-gray-600",
              column.type === 'status' && "cursor-pointer hover:text-gray-900",
            )}
            style={{ width: `${column.width}fr` }}
          >
            <span className="truncate">{column.title}</span>
            
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {column.type === 'status' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ChevronDown className="h-3 w-3" />
                  </TooltipTrigger>
                  <TooltipContent>Sort by {column.title.toLowerCase()}</TooltipContent>
                </Tooltip>
              )}
              
              {(column.type === 'status' || column.type === 'date') && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>Show {column.title.toLowerCase()} info</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
  
        {/* Add Column Button */}
        <div className="flex items-center justify-center">
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