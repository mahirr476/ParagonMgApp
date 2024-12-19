// src/data/board-data.ts

// Types
export type TaskStatus = 'Working on it' | 'Done' | 'Not Started' | 'Stuck'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  owner?: string
  status: TaskStatus
  dueDate?: string
  priority: TaskPriority
  timeline: string
}

export interface Group {
  id: string
  title: string
  isExpanded: boolean
  tasks: Task[]
  color: string // Added color property
}

// Status configurations
export const STATUS_CONFIG = {
  'Working on it': { color: 'bg-orange-400 text-white' },
  'Done': { color: 'bg-green-500 text-white' },
  'Not Started': { color: 'bg-gray-400 text-white' },
  'Stuck': { color: 'bg-red-500 text-white' }
} as const

// Priority configurations
export const PRIORITY_CONFIG = {
  'High': { color: 'bg-indigo-900 text-white' },
  'Medium': { color: 'bg-blue-500 text-white' },
  'Low': { color: 'bg-blue-400 text-white' }
} as const

// Group color configuration
export const GROUP_COLORS = {
  'todo': 'border-l-4 border-blue-500',
  'completed': 'border-l-4 border-green-500',
} as const

// Sample data
export const SAMPLE_BOARD_DATA: Group[] = [
  {
    id: '1',
    title: 'To-Do',
    isExpanded: true,
    color: GROUP_COLORS.todo,
    tasks: [
      {
        id: '1',
        title: 'Task 1',
        owner: 'John',
        status: 'Working on it',
        dueDate: '14 Dec',
        priority: 'Low',
        timeline: '14 - 15 Dec'
      },
      {
        id: '2',
        title: 'Task 2',
        status: 'Done',
        dueDate: '15 Dec',
        priority: 'High',
        timeline: '16 - 17 Dec'
      },
      {
        id: '3',
        title: 'New Task',
        owner: 'Jane',
        status: 'Not Started',
        priority: 'Medium',
        timeline: '18 - 19 Dec'
      },
      {
        id: '4',
        title: 'Task 3',
        status: 'Stuck',
        dueDate: '16 Dec',
        priority: 'Medium',
        timeline: '18 - 19 Dec'
      }
    ]
  },
  {
    id: '2',
    title: 'Completed',
    isExpanded: false,
    color: GROUP_COLORS.completed,
    tasks: []
  }
]

// Column configuration
export const BOARD_COLUMNS = [
  { id: 'task', title: 'Task', width: '2fr', hasSort: false },
  { id: 'owner', title: 'Owner', width: '1fr', hasSort: false },
  { id: 'status', title: 'Status', width: '1fr', hasSort: true },
  { id: 'dueDate', title: 'Due date', width: '1fr', hasSort: true },
  { id: 'priority', title: 'Priority', width: '1fr', hasSort: false },
  { id: 'timeline', title: 'Timeline', width: '1fr', hasSort: true }
] as const