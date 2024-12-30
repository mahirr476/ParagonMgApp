// src/components/board/CreateBoardDialog.tsx
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Board } from '@/types/board'
import { DEFAULT_COLUMNS, DEFAULT_GROUPS } from '@/data/board-data'

interface CreateBoardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateBoard: (board: Board) => void
  currentUser: string
}

export function CreateBoardDialog({ 
  open, 
  onOpenChange,
  onCreateBoard,
  currentUser
}: CreateBoardDialogProps) {
  const [formData, setFormData] = useState<Partial<Board>>({
    type: 'Main',
    notifications: 'Everything'
  })

  const handleSubmit = () => {
    if (!formData.name?.trim()) return

    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description || '',
      type: formData.type as 'Main' | 'Sub',
      owner: currentUser,
      createdBy: {
        name: currentUser,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric'
        })
      },
      notifications: formData.notifications as Board['notifications'],
      columns: DEFAULT_COLUMNS,
      items: [],
      groups: DEFAULT_GROUPS
    }

    onCreateBoard(newBoard)
    onOpenChange(false)
    setFormData({}) // Reset form
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace Name</label>
            <Input
              placeholder="Enter workspace name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe your workspace"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as 'Main' | 'Sub' })}
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Notifications</label>
            <Select
              value={formData.notifications}
              onValueChange={(value) => setFormData({ ...formData, notifications: value as Board['notifications'] })}
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}