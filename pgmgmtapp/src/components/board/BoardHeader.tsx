// src/components/board/BoardHeader.tsx
import { Button } from "@/components/ui/button"
import { 
  ChevronDown,
  Search,
  User2,
  Filter,
  ArrowUpDown,
  Eye,
  LayoutGrid,
  MoreHorizontal,
  ChevronUp,
  Plus,
  ArrowLeftRight,
  MessageCircle,
  Cog
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BoardHeaderProps {
  onViewToggle?: () => void;
  isExpanded?: boolean;
}

export function BoardHeader({ onViewToggle, isExpanded = false }: BoardHeaderProps) {
  return (
    <div className="flex flex-col">

      {/* Workspace Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Paragon IT
          <ChevronDown className="h-4 w-4" />
        </h1>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <MessageCircle className="h-4 w-4 mr-2" />
                Integrate
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open Integrations Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <Cog className="h-4 w-4 mr-2" />
                Automate
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open Automations Center</TooltipContent>
          </Tooltip>

          <Button variant="outline" size="sm" className="h-8">
            Invite / 1
            <ArrowLeftRight className="h-4 w-4 ml-2" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

       {/* Main Table Header */}
       <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-sm text-gray-700 hover:bg-gray-100 px-3"
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Main Table
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-gray-500"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

       {/* Action Bar */}
       <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            className="bg-[#0073ea] hover:bg-[#0060b9] text-white gap-1.5 h-8 text-sm px-3"
          >
            New task
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>

          <div className="flex items-center gap-1 ml-2">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search in board</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <User2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Person</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filter</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sort</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hide</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Group by</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>More actions</TooltipContent>
          </Tooltip>
        </div>
            {/* View Toggle Button - Now at bottom right */}
            <Button
            variant="ghost"
            size="icon"
            onClick={onViewToggle}
            className="h-6 w-6 text-gray-500 hover:bg-gray-100 rounded-full"
            >
            {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
            ) : (
                <ChevronDown className="h-4 w-4" />
            )}
            </Button>
        </div>
      </div>
    </div>
  )
}