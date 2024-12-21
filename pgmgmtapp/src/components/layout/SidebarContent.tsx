// src/components/layout/SidebarContent.tsx
"use client"

import { useState } from 'react'
import { 
  SidebarHeader,
  SidebarContent as SidebarContentWrapper,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Home,
  FolderKanban,
  Star,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CreateBoardDialog } from '../board/dialogs/CreateBoardDialog'
import { useBoard } from '@/contexts/BoardContext'
import { Board } from '@/types/board'

const CURRENT_USER = "Mahir Rahman"

export function SidebarContent() {
  const { state } = useSidebar()
  const { boards, currentBoard, setCurrentBoard, setBoards } = useBoard()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const handleCreateBoard = (newBoard: Board) => {
    setBoards([...boards, newBoard])
    setCurrentBoard(newBoard)
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <LayoutGrid className="w-6 h-6" />
          <span className="font-semibold">Boards</span>
          <SidebarTrigger className="ml-auto">
            {state === "expanded" ? (
              <ChevronLeft className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            )}
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContentWrapper>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="My Work">
              <FolderKanban className="w-4 h-4" />
              <span>My Work</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton tooltip="Favorites" className="flex-1">
              <Star className="w-4 h-4" />
              <span>Favorites</span>
            </SidebarMenuButton>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Show/Hide Favorites</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-2">
            <span>Workspaces</span>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search Workspaces</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Workspace Options</TooltipContent>
              </Tooltip>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="px-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2 mb-2"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>Add Workspace</span>
              </Button>
            </div>

            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton 
                    className={currentBoard?.id === board.id ? "bg-blue-50 text-blue-700" : ""}
                    tooltip={board.name}
                    onClick={() => setCurrentBoard(board)}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>{board.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentWrapper>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <CreateBoardDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateBoard={handleCreateBoard}
        currentUser={CURRENT_USER}
      />
    </>
  )
}