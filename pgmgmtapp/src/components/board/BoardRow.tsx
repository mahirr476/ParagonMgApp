// src/components/board/BoardRow.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SAMPLE_USERS, STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/data/board-constants"
import { 
    MessageCircle, 
    Clock, 
    Link2, 
    MoreHorizontal, 
    X,
    Pencil,
    Trash2
 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Task } from '@/types/board'
import { 
  StatusBadge, 
  PriorityBadge, 
  TimelineBadge,
  OwnerAvatar 
} from './components'


interface BoardRowProps {
    task: Task
    onUpdate: (updatedTask: Task) => void
    onDelete: (taskId: string) => void
  }
  
  export function BoardRow({ task, onUpdate, onDelete }: BoardRowProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState(task)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
  
    const handleEditSave = () => {
      onUpdate(editingTask)
      setEditDialogOpen(false)
    }
  

  return (
    <div 
      className={cn(
        "grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr_40px] relative",
        "hover:bg-[#f5f6f8] border-b border-[#e6e9ef] group"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Checkbox */}
      <div className="flex items-center justify-center py-[7px]">
        <Checkbox className="h-[14px] w-[14px] rounded-[2px] border-[1.5px]" />
      </div>

      {/* Task Title */}
      <div className="flex items-center gap-2 py-1 px-2">
          <span className="text-sm">{task.title}</span>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-[600px]">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="updates" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="activity">Activity Log</TabsTrigger>
                </TabsList>
                <TabsContent value="updates" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <Textarea 
                        placeholder="Write an update..."
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">@ Mention</Button>
                          <Button variant="ghost" size="sm">GIF</Button>
                          <Button variant="ghost" size="sm">😊</Button>
                        </div>
                        <Button>Update</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <p className="text-gray-500 mb-2">No updates yet for this item</p>
                        <p className="text-gray-400 text-sm">
                          Be the first one to update about progress, mention someone or upload files to share with your team members
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="files">Files tab content</TabsContent>
                <TabsContent value="activity">Activity log content</TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>

      {/* Owner */}
      <div className="flex items-center py-1 px-3">
        {task.owners && task.owners.map((owner) => (
          <OwnerAvatar key={owner} name={owner} />
        ))}
      </div>

      {/* Status */}
      <div className="py-1 px-3">
        <StatusBadge status={task.status} />
      </div>

      {/* Due Date */}
      <div className="flex items-center py-1 px-3">
        <span className="text-[13px] text-gray-900">{task.dueDate}</span>
      </div>

      {/* Priority */}
      <div className="py-1 px-3">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Timeline */}
      <div className="py-1 px-3">
        <TimelineBadge 
          timeline={task.timeline} 
          isDone={task.status === 'Done'}
        />
      </div>

       {/* Actions */}
       <div className={cn(
          "flex items-center justify-center py-3",
          !isHovered && "opacity-0",
          "group-hover:opacity-100 transition-opacity"
        )}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      {/* Last column for spacing */}
      <div className="w-[40px]" />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Owner</label>
              <div className="space-y-2">
                <label className="text-sm font-medium">Owners</label>
                {editingTask.owners.map((owner, index) => (
                  <Select
                    key={index}
                    value={owner}
                    onValueChange={(value) => {
                      const newOwners = [...editingTask.owners];
                      newOwners[index] = value;
                      setEditingTask({ ...editingTask, owners: newOwners });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SAMPLE_USERS.map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editingTask.status}
                onValueChange={(value: any) => setEditingTask({ ...editingTask, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="text"
                value={editingTask.dueDate || ''}
                onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                placeholder="e.g., 15 Dec"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={editingTask.priority}
                onValueChange={(value: any) => setEditingTask({ ...editingTask, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timeline</label>
              <Input
                value={`${editingTask.timeline.start} - ${editingTask.timeline.end}`}
                onChange={(e) => {
                  const [start, end] = e.target.value.split(' - ');
                  setEditingTask({ ...editingTask, timeline: { start, end } });
                }}
                placeholder="e.g., 14 - 15 Dec"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}