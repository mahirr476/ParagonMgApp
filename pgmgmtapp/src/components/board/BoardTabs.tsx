// src/components/board/BoardTabs.tsx
import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { LayoutGrid, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Tab {
  id: string
  name: string
}

interface BoardTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function BoardTabs({ activeTab, onTabChange }: BoardTabsProps) {
  const [tabs, setTabs] = useState<Tab[]>([{ id: 'main', name: 'Main Table' }])
  const [editingTabId, setEditingTabId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tabToDelete, setTabToDelete] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      name: ''
    }
    setTabs([...tabs, newTab])
    setEditingTabId(newTab.id)
  }

  const handleTabNameSubmit = (tabId: string, name: string) => {
    if (name.trim()) {
      setTabs(tabs.map(tab => 
        tab.id === tabId ? { ...tab, name: name.trim() } : tab
      ))
      onTabChange(tabId)
    } else {
      setTabs(tabs.filter(tab => tab.id !== tabId))
    }
    setEditingTabId(null)
  }

  const handleDeleteClick = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTabToDelete(tabId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (tabToDelete) {
      const newTabs = tabs.filter(tab => tab.id !== tabToDelete)
      setTabs(newTabs)
      
      if (tabToDelete === activeTab && newTabs.length > 0) {
        onTabChange(newTabs[0].id)
      }
    }
    setDeleteDialogOpen(false)
    setTabToDelete(null)
  }

  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingTabId])

  const getTabToDeleteName = () => {
    return tabs.find(tab => tab.id === tabToDelete)?.name || ''
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "relative group",
              activeTab === tab.id && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0073ea]"
            )}
          >
            {editingTabId === tab.id ? (
              <input
                ref={inputRef}
                className="px-3 py-1 border rounded text-sm"
                defaultValue={tab.name}
                onBlur={(e) => handleTabNameSubmit(tab.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTabNameSubmit(tab.id, e.currentTarget.value)
                  }
                }}
              />
            ) : (
              <div className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm text-gray-700 hover:bg-gray-100",
                    "transition-all duration-200",
                    "pr-3 pl-3",
                    activeTab === tab.id && "group-hover:pr-9" // Only expand when active
                  )}
                  onClick={() => onTabChange(tab.id)}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  {tab.name}
                </Button>
                {activeTab === tab.id && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2
                      className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
                      onClick={(e) => handleDeleteClick(tab.id, e)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-500"
          onClick={handleAddTab}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tab</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{getTabToDeleteName()}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}