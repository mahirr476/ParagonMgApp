// src/types/board.ts

// Column Types
export type ColumnType = 'text' | 'number' | 'status' | 'date' | 'person';

export interface Column {
  id: string;
  title: string;
  type: ColumnType;
  width?: number;
}

export interface BoardItem {
  id: string;
  [key: string]: any; // Dynamic fields based on columns
}

export interface Group {
  id: string;
  title: string;
  isExpanded: boolean;
  tasks: Task[];
  color: string;
}

// Task Types
export type TaskStatus = 'Working on it' | 'Done' | 'Not Started' | 'Stuck';
export type TaskPriority = 'Critical' | 'None'| 'Low' | 'Medium' | 'High';

export const PRIORITY_STYLES = {
  'Critical': { bg: 'bg-black', text: 'text-white', icon: true },
  'High': { bg: 'bg-[#401694]', text: 'text-white', icon: false },
  'Medium': { bg: 'bg-[#0073ea]', text: 'text-white', icon: false },
  'Low': { bg: 'bg-[#579bfc]', text: 'text-white', icon: false },
  'None': { bg: 'bg-[#c4c4c4]', text: 'text-white', icon: false }
} as const

export interface Task {
  id: string
  title: string
  owners: string[]  // Changed from owner to owners array
  status: TaskStatus
  dueDate?: string
  dueDateTime?: string // Added for time tracking
  priority: TaskPriority
  timeline: {
    start: string
    end: string
  }
}
// Board Types
export type BoardType = 'Main' | 'Sub';
export type NotificationType = 'Everything' | 'Important' | 'None';

export interface Board {
  id: string;
  name: string;                    // Board name
  description: string;             // Board description
  type: BoardType;                 // Main or Sub
  owner: string;                   // Board owner
  createdBy: {                     // Creation metadata
    name: string;
    date: string;
  };
  notifications: NotificationType; // Notification settings
  columns: Column[];              // Column configuration
  items: BoardItem[];             // Board items
  groups: Group[];                // Groups containing tasks
}