// src/components/layout/TopNavbar.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Inbox,
  Users2,
  HelpCircle,
  MoreHorizontal,
  Search,
  Diamond,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Custom App Launcher Icon
const AppsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 1C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2C5 1.44772 4.55228 1 4 1H2Z" />
    <path d="M2 8C1.44772 8 1 8.44772 1 9V11C1 11.5523 1.44772 12 2 12H4C4.55228 12 5 11.5523 5 11V9C5 8.44772 4.55228 8 4 8H2Z" />
    <path d="M1 16C1 15.4477 1.44772 15 2 15H4C4.55228 15 5 15.4477 5 16V18C5 18.5523 4.55228 19 4 19H2C1.44772 19 1 18.5523 1 18V16Z" />
    <path d="M9 1C8.44772 1 8 1.44772 8 2V4C8 4.55228 8.44772 5 9 5H11C11.5523 5 12 4.55228 12 4V2C12 1.44772 11.5523 1 11 1H9Z" />
    <path d="M8 9C8 8.44772 8.44772 8 9 8H11C11.5523 8 12 8.44772 12 9V11C12 11.5523 11.5523 12 11 12H9C8.44772 12 8 11.5523 8 11V9Z" />
    <path d="M9 15C8.44772 15 8 15.4477 8 16V18C8 18.5523 8.44772 19 9 19H11C11.5523 19 12 18.5523 12 18V16C12 15.4477 11.5523 15 11 15H9Z" />
    <path d="M15 2C15 1.44772 15.4477 1 16 1H18C18.5523 1 19 1.44772 19 2V4C19 4.55228 18.5523 5 18 5H16C15.4477 5 15 4.55228 15 4V2Z" />
    <path d="M16 8C15.4477 8 15 8.44772 15 9V11C15 11.5523 15.4477 12 16 12H18C18.5523 12 19 11.5523 19 11V9C19 8.44772 18.5523 8 18 8H16Z" />
    <path d="M15 16C15 15.4477 15.4477 15 16 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H16C15.4477 19 15 18.5523 15 18V16Z" />
  </svg>
)

// MondayLogo component
const MondayLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF3D57"/>
      <path d="M2 17L12 22L22 17" stroke="#FF3D57" strokeWidth="2"/>
      <path d="M2 12L12 17L22 12" stroke="#FF3D57" strokeWidth="2"/>
    </svg>
    <span className="font-semibold">Paragon Work Management</span>
  </div>
)

export function TopNavbar() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-4">
          <MondayLogo />
          {/* <Button variant="ghost" className="flex items-center gap-2 bg-gray-50">
              <span>My Workspace</span>
              <ChevronDown className="w-4 h-4" />
            </Button> */}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-[200px]"
            />
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Inbox className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Inbox</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Users2 className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Invite members & guests</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help & Support</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AppsIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Apps & Integrations</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More options</TooltipContent>
            </Tooltip>

            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}