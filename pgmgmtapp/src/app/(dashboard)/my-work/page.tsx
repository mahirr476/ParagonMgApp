
// src/app/(dashboard)/my-work/page.tsx
"use client"

import { Button } from '@/components/ui/button'
import { Plus, Search, Clock } from 'lucide-react'

export default function MyWorkPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">My Work</h1>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Customize
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          New Item
        </Button>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-medium mb-2">Past Dates</h2>
          <div className="border rounded-lg">
            <div className="p-3 flex items-center gap-4">
              <input type="text" placeholder="Task 1" className="flex-1 bg-transparent outline-none" />
              <span className="text-sm text-muted-foreground">To-Do</span>
              <span className="text-sm text-muted-foreground">Paragon IT</span>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <span className="text-sm">14-Dec-24</span>
              <span className="px-3 py-1 rounded bg-green-100 text-green-700">Done</span>
              <span className="px-3 py-1 rounded bg-blue-100 text-blue-700">Low</span>
            </div>
          </div>
        </div>

        {['Today', 'This week', 'Next week', 'Later'].map(section => (
          <div key={section}>
            <h2 className="text-sm font-medium mb-2 flex items-center gap-2">
              {section}
              <span className="text-xs text-muted-foreground">0 items</span>
            </h2>
            <div className="border rounded-lg p-2">
              <input type="text" placeholder="+ Add item" className="w-full bg-transparent outline-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}