// src/components/layout/MainLayout.tsx
"use client"

import { 
  Sidebar, 
  SidebarHeader,
  SidebarContent, 
  SidebarFooter,
  SidebarTrigger,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInset,
  useSidebar
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  Settings,
  Users,
  Home,
  ChevronDown,
  Menu
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface MainContentProps {
  children: React.ReactNode
}

function MainContent({ children }: MainContentProps) {
    const { toggleSidebar, state } = useSidebar()
  
    return (
      <SidebarInset className="w-full">
        {/* Top Navigation */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-background w-full">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <span>My Workspace</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-[200px]"
              />
            </div>
            <Button size="sm">Upgrade</Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
  
        {/* Board Content */}
        <main className="flex-1 h-[calc(100vh-3.5rem)] w-full overflow-auto">
          <div className="container mx-auto max-w-full px-6 py-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    )
  }

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <LayoutGrid className="w-6 h-6" />
              <span className="font-semibold">Boards</span>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Team">
                    <Users className="w-4 h-4" />
                    <span>Team</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Boards Section */}
            <SidebarGroup>
              <SidebarGroupLabel>
                Boards
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start gap-2 mb-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Board
                </Button>
                <SidebarMenu>
                  {["Main Board", "Development", "Marketing"].map((board) => (
                    <SidebarMenuItem key={board}>
                      <SidebarMenuButton tooltip={board}>
                        <LayoutGrid className="w-4 h-4" />
                        <span>{board}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

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
        </Sidebar>          <MainContent>
            {children}
          </MainContent>
        </div>
      </SidebarProvider>
    )
  }
  