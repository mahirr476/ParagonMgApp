// src/components/layout/MainLayout.tsx
"use client"

import { 
  Sidebar, 
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar'
import { TopNavbar } from './TopNavbar'
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarContent } from './SidebarContent' // We'll create this

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
      <TooltipProvider delayDuration={300}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex flex-col h-screen overflow-hidden">
            <div className="relative z-50">
              <TopNavbar />
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              <Sidebar collapsible="icon">
                <SidebarContent />
              </Sidebar>
  
              <main className="flex-1 h-full overflow-auto w-screen">
                <div className="h-full w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    )
  }