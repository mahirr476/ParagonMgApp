"use client"

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
import { WorkspaceMenu } from './sidebar/WorkspaceMenu'
import { useBoard, Board } from '@/contexts/BoardContext'

const CURRENT_USER = "Mahir Rahman"

export function SidebarContent() {
  const router = useRouter()
  const pathname = usePathname()
  const { state } = useSidebar()
  const { boards, currentBoard, setCurrentBoard, setBoards } = useBoard()
  const [showFavorites, setShowFavorites] = useState(true)

  const handleCreateBoard = (newBoard: Board) => {
    setBoards([...boards, newBoard])
    setCurrentBoard(newBoard)
    router.push(`/board/${newBoard.id}`)
  }

  const isActiveRoute = (path: string) => pathname === path
  const isBoardRoute = (boardId: string) => pathname === `/board/${boardId}`

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
            <SidebarMenuButton 
              tooltip="Home"
              className={isActiveRoute('/') ? "bg-blue-50 text-blue-700" : ""}
              onClick={() => router.push('/')}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="My Work"
              className={isActiveRoute('/my-work') ? "bg-blue-50 text-blue-700" : ""}
              onClick={() => router.push('/my-work')}
            >
              <FolderKanban className="w-4 h-4" />
              <span>My Work</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton 
              tooltip="Favorites" 
              className={`flex-1 ${isActiveRoute('/favorites') ? "bg-blue-50 text-blue-700" : ""}`}
              onClick={() => router.push('/favorites')}
            >
              <Star className="w-4 h-4" />
              <span>Favorites</span>
            </SidebarMenuButton>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowFavorites(!showFavorites)
                  }}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    showFavorites ? 'rotate-180' : ''
                  }`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Show/Hide Favorites</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>

          {showFavorites && (
            <div className="pl-8 py-2 text-sm text-muted-foreground">
              No favorites yet
            </div>
          )}
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
              <WorkspaceMenu 
                onCreateBoard={handleCreateBoard} 
                currentUser={CURRENT_USER} 
              />
            </div>

            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton 
                    className={isBoardRoute(board.id) ? "bg-blue-50 text-blue-700" : ""}
                    tooltip={board.name}
                    onClick={() => {
                      setCurrentBoard(board)
                      router.push(`/board/${board.id}`)
                    }}
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
            <SidebarMenuButton 
              tooltip="Settings"
              className={isActiveRoute('/settings') ? "bg-blue-50 text-blue-700" : ""}
              onClick={() => router.push('/settings')}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}