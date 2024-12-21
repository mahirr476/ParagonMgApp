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
  'Working on it': { color: 'bg-[#fdab3d]', textColor: 'text-white' },
  'Done': { color: 'bg-[#00c875]', textColor: 'text-white' },
  'Not Started': { color: 'bg-[#c4c4c4]', textColor: 'text-white' },
  'Stuck': { color: 'bg-[#e2445c]', textColor: 'text-white' }
} as const

// Priority configurations
export const PRIORITY_CONFIG = {
  'High': { color: 'bg-[#401694]', textColor: 'text-white' },
  'Medium': { color: 'bg-[#0073ea]', textColor: 'text-white' },
  'Low': { color: 'bg-[#579bfc]', textColor: 'text-white' }
} as const

// Group color configuration
export const GROUP_COLORS = {
  'todo': 'border-l-4 border-[#0073ea]',
  'completed': 'border-l-4 border-[#00c875]',
} as const

// Sample users data
export const SAMPLE_USERS = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Mike Johnson' },
  { id: '4', name: 'Sarah Wilson' },
  { id: '5', name: 'Alex Brown' }
]

// Default columns for new boards
export const DEFAULT_COLUMNS: Column[] = [
  { id: 'task', title: 'Task', type: 'text', width: 2 },
  { id: 'owners', title: 'Owners', type: 'person', width: 1 },
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
    items: [],
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
            owners: ['John Doe'],
            status: 'Working on it',
            dueDate: '14 Dec',
            dueDateTime: '2024-12-14T00:00:00.000Z',
            priority: 'Low',
            timeline: {
              start: '14 Dec',
              end: '15 Dec'
            }
          },
          {
            id: '2',
            title: 'Task 2',
            owners: ['Jane Smith', 'Mike Johnson'],
            status: 'Done',
            dueDate: '15 Dec',
            dueDateTime: '2024-12-15T00:00:00.000Z',
            priority: 'High',
            timeline: {
              start: '16 Dec',
              end: '17 Dec'
            }
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
  { id: 'owners', title: 'Owners', width: '1fr', hasSort: false },
  { id: 'status', title: 'Status', width: '1fr', hasSort: true },
  { id: 'dueDate', title: 'Due date', width: '1fr', hasSort: true },
  { id: 'priority', title: 'Priority', width: '1fr', hasSort: false },
  { id: 'timeline', title: 'Timeline', width: '1fr', hasSort: true }
] as const

// Re-export the types that other files need
export type { Board, Group, Task, TaskStatus, TaskPriority };