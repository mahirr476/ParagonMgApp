// src/components/layout/sidebar/WorkspaceMenu.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Layout,
  FileText,
  BarChart3,
  PencilLine,
  Folder,
  Download,
  Plus,
} from 'lucide-react'
import { Board } from '@/contexts/BoardContext'
import { DEFAULT_COLUMNS, DEFAULT_GROUPS } from '@/data/board-data'
import { BoardType } from '@/types/board'

const DIALOG_TYPES = {
  BOARD: 'board',
  DOC: 'doc',
  DASHBOARD: 'dashboard',
  FOLDER: 'folder'
} as const

type DialogType = typeof DIALOG_TYPES[keyof typeof DIALOG_TYPES]
type Privacy = 'Main' | 'Private' | 'Shareable'

interface WorkspaceMenuProps {
  onCreateBoard: (board: Board) => void
  currentUser: string
}

export function WorkspaceMenu({ onCreateBoard, currentUser }: WorkspaceMenuProps) {
  const [dialogType, setDialogType] = useState<DialogType | null>(null)
  const [itemName, setItemName] = useState('')
  const [privacyType, setPrivacyType] = useState<Privacy>('Main')

  const handleCreate = () => {
    if (!itemName.trim() || !dialogType) return

    switch (dialogType) {
      case DIALOG_TYPES.BOARD:
        onCreateBoard({
          id: `board-${Date.now()}`,
          name: itemName.trim(),
          description: '',
          type: privacyType as BoardType, 
          owner: currentUser,
          createdBy: {
            name: currentUser,
            date: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })
          },
          notifications: 'Everything',
          columns: DEFAULT_COLUMNS,
          items: [],
          groups: DEFAULT_GROUPS
        })
        break
      case DIALOG_TYPES.FOLDER:
        // Handle folder creation
        break
      case DIALOG_TYPES.DOC:
        // Handle doc creation
        break
      case DIALOG_TYPES.DASHBOARD:
        // Handle dashboard creation
        break
    }

    setDialogType(null)
    setItemName('')
  }

  const getDialogTitle = (type: DialogType | null) => {
    if (!type) return ''
    switch (type) {
      case DIALOG_TYPES.DOC: return 'Doc'
      case DIALOG_TYPES.DASHBOARD: return 'Dashboard'
      case DIALOG_TYPES.FOLDER: return 'Folder'
      case DIALOG_TYPES.BOARD: return 'Board'
      default: return ''
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2 mb-3">
            <Plus className="h-4 w-4" />
            <span>Add New Board</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <div className="p-2">
            <div className="text-sm font-medium mb-2">Add new</div>
            <div className="space-y-1">
              <DropdownMenuItem onClick={() => setDialogType(DIALOG_TYPES.BOARD)} className="gap-2">
                <Layout className="w-4 h-4" />
                <span>Board</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDialogType(DIALOG_TYPES.DOC)} className="gap-2">
                <FileText className="w-4 h-4" />
                <span>Doc</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDialogType(DIALOG_TYPES.DASHBOARD)} className="gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDialogType(DIALOG_TYPES.FOLDER)} className="gap-2">
                <Folder className="w-4 h-4" />
                <span>Folder</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-gray-500">
                <PencilLine className="w-4 h-4" />
                <span>Form</span>
              </DropdownMenuItem>
            </div>
            <div className="border-t my-2" />
            <div className="space-y-1">
              <DropdownMenuItem className="gap-2 text-gray-500">
                <Download className="w-4 h-4" />
                <span>Import data</span>
              </DropdownMenuItem>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={!!dialogType} onOpenChange={(open) => !open && setDialogType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create {getDialogTitle(dialogType)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder={`Enter ${dialogType?.toLowerCase()} name`}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Privacy</label>
              <div className="flex gap-2">
                <Button
                  variant={privacyType === 'Main' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPrivacyType('Main')}
                  className="flex-1"
                >
                  Main
                </Button>
                <Button
                  variant={privacyType === 'Private' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPrivacyType('Private')}
                  className="flex-1"
                >
                  Private
                </Button>
                <Button
                  variant={privacyType === 'Shareable' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPrivacyType('Shareable')}
                  className="flex-1"
                >
                  Shareable
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogType(null)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create {getDialogTitle(dialogType)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}