// src/components/board/EditableCell.tsx
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@/types/board"
import { SAMPLE_USERS, STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/data/board-constants"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditableCellProps {
  type: 'title' | 'owners' | 'status' | 'priority' | 'dueDate' | 'timeline'
  task: Task
  onUpdate: (updatedTask: Task) => void
}

export function EditableCell({ type, task, onUpdate }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)

  switch (type) {
    case 'title':
      return isEditing ? (
        <Input
          value={task.title}
          onChange={(e) => onUpdate({ ...task, title: e.target.value })}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsEditing(false)
            }
          }}
          autoFocus
          className="h-8"
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="cursor-text h-8 flex items-center"
        >
          {task.title || "Click to add title"}
        </div>
      )

    case 'owners':
      return (
        <Select
          onValueChange={(value) => {
            const selectedName = SAMPLE_USERS.find(user => user.id === value)?.name
            if (selectedName) {
              if (task.owners.includes(selectedName)) {
                onUpdate({
                  ...task,
                  owners: task.owners.filter(owner => owner !== selectedName)
                })
              } else {
                onUpdate({
                  ...task,
                  owners: [...task.owners, selectedName]
                })
              }
            }
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue>
              {task.owners.length 
                ? `${task.owners.length} owner${task.owners.length > 1 ? 's' : ''}` 
                : "Add owners"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Team Members</SelectLabel>
              {SAMPLE_USERS.map((user) => (
                <SelectItem 
                  key={user.id} 
                  value={user.id}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={task.owners.includes(user.name)}
                      className="pointer-events-none"
                    />
                    <span>{user.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )

    case 'dueDate':
      return (
        <DatePicker
          date={task.dueDateTime ? new Date(task.dueDateTime) : undefined}
          onDateChange={(date) => {
            onUpdate({
              ...task,
              dueDate: date ? format(date, 'dd MMM') : undefined,
              dueDateTime: date?.toISOString()
            })
          }}
        />
      )

    case 'timeline':
      return (
        <div className="flex gap-1">
          <DatePicker
            date={task.timeline.start ? new Date(task.timeline.start) : undefined}
            onDateChange={(date) => {
              onUpdate({
                ...task,
                timeline: {
                  ...task.timeline,
                  start: date ? format(date, 'dd MMM') : ''
                }
              })
            }}
            placeholder="Start"
          />
          <DatePicker
            date={task.timeline.end ? new Date(task.timeline.end) : undefined}
            onDateChange={(date) => {
              onUpdate({
                ...task,
                timeline: {
                  ...task.timeline,
                  end: date ? format(date, 'dd MMM') : ''
                }
              })
            }}
            placeholder="End"
          />
        </div>
      )

    default:
      return null
  }
}