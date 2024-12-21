// src/data/board-data.ts
import type {
  Board,
  Column,
  Group,
  Task,
  TaskStatus,
  TaskPriority,
  BoardType,
  NotificationType
} from '@/types/board';

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

// Default columns for new boards
export const DEFAULT_COLUMNS: Column[] = [
  { id: 'task', title: 'Task', type: 'text', width: 2 },
  { id: 'owner', title: 'Owner', type: 'person', width: 1 },
  { id: 'status', title: 'Status', type: 'status', width: 1 },
  { id: 'dueDate', title: 'Due date', type: 'date', width: 1 },
  { id: 'priority', title: 'Priority', type: 'status', width: 1 },
  { id: 'timeline', title: 'Timeline', type: 'text', width: 1 }
]

// Default groups for new boards
export const DEFAULT_GROUPS: Group[] = [
  {
    id: '1',
    title: 'To-Do',
    isExpanded: true,
    color: GROUP_COLORS.todo,
    tasks: []
  },
  {
    id: '2',
    title: 'Completed',
    isExpanded: false,
    color: GROUP_COLORS.completed,
    tasks: []
  }
]

// Sample boards data
export const boards: Board[] = [
  {
    id: 'board-1',
    name: 'Paragon IT',
    description: 'Manage any type of project. Assign owners, set timelines and keep track of where your project stands.',
    type: 'Main',
    owner: 'Mahir Rahman',
    createdBy: {
      name: 'Mahir Rahman',
      date: 'Dec 15, 2024'
    },
    notifications: 'Everything',
    columns: DEFAULT_COLUMNS,
    items: [], // Initially empty, items will be generated from tasks
    groups: [
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
  },
  {
    id: 'board-2',
    name: 'Development Tasks',
    description: 'Track development tasks and bug fixes.',
    type: 'Sub',
    owner: 'Mahir Rahman',
    createdBy: {
      name: 'Mahir Rahman',
      date: 'Dec 16, 2024'
    },
    notifications: 'Important',
    columns: DEFAULT_COLUMNS,
    items: [],
    groups: DEFAULT_GROUPS
  }
]

// Column configuration for UI
export const BOARD_COLUMNS = [
  { id: 'task', title: 'Task', width: '2fr', hasSort: false },
  { id: 'owner', title: 'Owner', width: '1fr', hasSort: false },
  { id: 'status', title: 'Status', width: '1fr', hasSort: true },
  { id: 'dueDate', title: 'Due date', width: '1fr', hasSort: true },
  { id: 'priority', title: 'Priority', width: '1fr', hasSort: false },
  { id: 'timeline', title: 'Timeline', width: '1fr', hasSort: true }
] as const

// Re-export the types that other files need
export type { Board, Group, Task, TaskStatus, TaskPriority };
