// src/components/board/BoardHeader.tsx
// src/components/board/BoardHeader.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Search,
  User2,
  Filter,
  ArrowUpDown,
  Eye,
  LayoutGrid,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
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
import { BoardSelector } from './BoardSelector'
import { BoardTabs } from './BoardTabs'
import { BoardDialog } from './BoardDialogs'
import { Board } from '@/types/board'
import { boards } from '@/data/board-data'

interface BoardHeaderProps {
  onViewToggle?: () => void;
  isExpanded?: boolean;
  selectedBoard: Board;
  onBoardSelect: (board: Board) => void;
}

export function BoardHeader({ 
  onViewToggle, 
  isExpanded = false,
  selectedBoard,
  onBoardSelect 
}: BoardHeaderProps) {
  const [activeTab, setActiveTab] = useState("main")
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
  }>({ isOpen: false, title: '' })

  const handleOpenDialog = (title: string) => {
    setDialogConfig({ isOpen: true, title })
  }

  return (
    <div className="flex flex-col">
      {/* Workspace Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <BoardSelector
          selectedBoard={selectedBoard}
          onBoardSelect={onBoardSelect}
          boards={boards}
        />
        
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleOpenDialog('Integrations Center')}
                >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Integrate
                </Button>
                </TooltipTrigger>
                <TooltipContent>Open Integrations Center</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleOpenDialog('Automations Center')}
                >
                    <Cog className="h-4 w-4 mr-2" />
                    Automate
                </Button>
                </TooltipTrigger>
                <TooltipContent>Open Automations Center</TooltipContent>
            </Tooltip>

            <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={() => handleOpenDialog('Invite Members')}
            >
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
        <BoardTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
            </div>
        </div>

        {/* Dialog */}
        <BoardDialog
            isOpen={dialogConfig.isOpen}
            onClose={() => setDialogConfig({ isOpen: false, title: '' })}
            title={dialogConfig.title}
        />
        </div>
  )
}