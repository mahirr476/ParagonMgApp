// src/components/board/BoardSelector.tsx
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown,
  Star
} from "lucide-react"
import { Board } from '@/types/board'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface BoardSelectorProps {
  selectedBoard: Board
  onBoardSelect: (board: Board) => void
  boards: Board[]
}

export function BoardSelector({ selectedBoard, onBoardSelect }: BoardSelectorProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(selectedBoard.name)

  const handleNameChange = (newName: string) => {
    setName(newName)
    onBoardSelect({ ...selectedBoard, name: newName })
  }

  const handleBoardUpdate = (field: keyof Board, value: any) => {
    onBoardSelect({ ...selectedBoard, [field]: value })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="px-0 font-semibold text-xl hover:bg-transparent flex items-center gap-2"
        >
          {selectedBoard.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-4" 
        align="start"
        sideOffset={5}
      >
        <div className="space-y-6">
          {/* Board Title and Star */}
          <div className="flex items-start gap-3 group">
            <div className="flex-1 relative">
              <Input 
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="text-lg font-medium border-none p-0 focus-visible:ring-0 w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 group-hover:bg-gray-400 transition-colors" />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600">
            {selectedBoard.description}
          </p>

          {/* Board Info Section */}
          <div className="space-y-4">
            <h3 className="font-medium mb-4">Board info</h3>

            {/* Board Type */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <span className="text-sm text-gray-600">Board type</span>
              <Select 
                value={selectedBoard.type}
                onValueChange={(value) => handleBoardUpdate('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main">Main</SelectItem>
                  <SelectItem value="Sub">Sub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Owner */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <span className="text-sm text-gray-600">Owner</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{selectedBoard.owner[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{selectedBoard.owner}</span>
              </div>
            </div>

            {/* Created By */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <span className="text-sm text-gray-600">Created by</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{selectedBoard.createdBy.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">on {selectedBoard.createdBy.date}</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <span className="text-sm text-gray-600">Notifications</span>
              <Select 
                value={selectedBoard.notifications}
                onValueChange={(value) => handleBoardUpdate('notifications', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Everything">Everything</SelectItem>
                  <SelectItem value="Important">Important</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}