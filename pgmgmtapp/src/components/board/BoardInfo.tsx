// src/components/board/BoardInfo.tsx
import { Star } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Board } from '@/types/board'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface BoardInfoProps {
  board: Board
  onUpdate: (board: Board) => void
}

export function BoardInfo({ board, onUpdate }: BoardInfoProps) {
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <Input 
          value={board.name}
          onChange={(e) => onUpdate({ ...board, name: e.target.value })}
          className="text-lg font-medium border-none px-0 focus-visible:ring-0"
        />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Star className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        {board.description}
      </p>

      <div className="space-y-4">
        <h3 className="font-medium mb-2">Board info</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Board type</span>
          <Select 
            value={board.type} 
            onValueChange={(value) => onUpdate({ ...board, type: value as 'Main' | 'Sub' })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main">Main</SelectItem>
              <SelectItem value="Sub">Sub</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Owner</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{board.owner[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{board.owner}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Created by</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{board.createdBy.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">on {board.createdBy.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Notifications</span>
          <Select 
            value={board.notifications} 
            onValueChange={(value) => onUpdate({ ...board, notifications: value as Board['notifications'] })}
          >
            <SelectTrigger className="w-[180px]">
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
  )
}