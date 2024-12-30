// src/components/board/BoardRow.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  SelectGroup, 
  SelectLabel, 
} from "@/components/ui/select"
import { SAMPLE_USERS } from "@/data/board-constants"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MessageCircle, Clock, Link2, MoreHorizontal, X, Trash2, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Task, TaskStatus } from '@/types/board'
import { StatusBadge, PriorityBadge, TimelineBadge, OwnerAvatar } from './components'
import { DatePicker } from "@/components/ui/date-picker"
import { isAfter, parseISO, format } from 'date-fns'
import { Textarea } from '../ui/textarea'

interface BoardRowProps {
  task: Task
  onUpdate: (updatedTask: Task) => void
  onDelete: (taskId: string) => void
}

export function BoardRow({ task, onUpdate, onDelete }: BoardRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function isDatePast(dateStr?: string): boolean {
    if (!dateStr) return false
    const date = parseISO(dateStr)
    return isAfter(new Date(), date)
  }

  function isTaskDone(status: TaskStatus): boolean {
    return status === 'Done'
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
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 py-1 px-2 cursor-pointer">
            <span className="text-sm">{task.title}</span>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
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
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <input
            className="w-full p-2 border rounded"
            value={task.title}
            onChange={(e) => onUpdate({ ...task, title: e.target.value })}
          />
        </PopoverContent>
      </Popover>

      {/* Owner */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center py-1 px-3 cursor-pointer">
            {task.owners && task.owners.map((owner) => (
              <OwnerAvatar key={owner} name={owner} />
            ))}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <SelectGroup>
            <SelectLabel>Team Members</SelectLabel>
            {SAMPLE_USERS.map((user) => (
              <div key={user.id} className="flex items-center space-x-2 p-2">
                <Checkbox
                  checked={task.owners.includes(user.name)}
                  onCheckedChange={(checked) => {
                    const newOwners = checked
                      ? [...task.owners, user.name]
                      : task.owners.filter(o => o !== user.name)
                    onUpdate({ ...task, owners: newOwners })
                  }}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </SelectGroup>
        </PopoverContent>
      </Popover>

      {/* Status */}
      <div className="py-1 px-3">
        <StatusBadge 
          status={task.status} 
          onStatusChange={(newStatus) => onUpdate({ ...task, status: newStatus })}
        />
      </div>

      {/* Due Date */}
      <DatePicker
        mode="single"
        date={task.dueDateTime ? new Date(task.dueDateTime) : undefined}
        onDateChange={(date) => {
          onUpdate({
            ...task,
            dueDate: date ? format(date, 'dd MMM') : undefined,
            dueDateTime: date?.toISOString()
          })
        }}
        trigger={
          <div className="flex items-center py-1 px-3 cursor-pointer">
            <div className="w-full flex items-center justify-between">
              <span className={cn(
                "text-[13px]",
                isDatePast(task.dueDateTime) && !isTaskDone(task.status) 
                  ? "text-[#e2445c]" 
                  : "text-gray-900"
              )}>
                {task.dueDate}
              </span>
              <Info className="h-3 w-3 opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        }
      />

      {/* Priority */}
      <div className="py-1 px-3">
        <PriorityBadge 
          priority={task.priority}
          onPriorityChange={(newPriority) => onUpdate({ ...task, priority: newPriority })}
        />
      </div>

      {/* Timeline */}
      <DatePicker
        mode="range"
        dateRange={{
          from: task.timeline.start ? new Date(task.timeline.start) : undefined,
          to: task.timeline.end ? new Date(task.timeline.end) : undefined
        }}
        onDateRangeChange={(range) => {
          onUpdate({
            ...task,
            timeline: {
              start: range?.from ? format(range.from, 'dd MMM') : '',
              end: range?.to ? format(range.to, 'dd MMM') : ''
            }
          })
        }}
        trigger={
          <div className="py-1 px-3 cursor-pointer">
            <TimelineBadge 
              timeline={task.timeline} 
              isDone={task.status === 'Done'}
            />
          </div>
        }
      />

      {/* Delete Button */}
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  )
}