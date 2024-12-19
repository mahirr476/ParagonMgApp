// src/data/sample-boards.ts
import { Board } from '@/store/boardStore';

export const SAMPLE_USERS = [
  { id: '1', name: 'John Doe', avatar: '/avatars/john.png' },
  { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.png' },
  { id: '3', name: 'Mike Johnson', avatar: '/avatars/mike.png' },
  { id: '4', name: 'Sarah Wilson', avatar: '/avatars/sarah.png' },
] as const;

export const STATUS_OPTIONS = [
  { id: 'planning', label: 'Planning', color: 'gray' },
  { id: 'todo', label: 'Todo', color: 'blue' },
  { id: 'in_progress', label: 'In Progress', color: 'yellow' },
  { id: 'in_review', label: 'In Review', color: 'purple' },
  { id: 'done', label: 'Done', color: 'green' },
] as const;

export const PRIORITY_OPTIONS = [
  { id: 'low', label: 'Low', color: 'green' },
  { id: 'medium', label: 'Medium', color: 'yellow' },
  { id: 'high', label: 'High', color: 'red' },
] as const;

export const SAMPLE_BOARDS: Board[] = [
  {
    id: '1',
    title: 'Main Board',
    columns: [
      { id: 'title', title: 'Title', type: 'text' },
      { id: 'status', title: 'Status', type: 'status' },
      { id: 'date', title: 'Due Date', type: 'date' },
      { id: 'owner', title: 'Owner', type: 'person' },
      { id: 'priority', title: 'Priority', type: 'status' },
    ],
    items: [
      { 
        id: '1', 
        title: 'Implement authentication', 
        status: 'in_progress',
        date: '2024-12-20',
        owner: '1',
        priority: 'high'
      },
      { 
        id: '2', 
        title: 'Create dashboard design', 
        status: 'done',
        date: '2024-12-25',
        owner: '2',
        priority: 'medium'
      },
      { 
        id: '3', 
        title: 'API integration', 
        status: 'planning',
        date: '2024-12-28',
        owner: '3',
        priority: 'high'
      },
    ],
  },
  {
    id: '2',
    title: 'Development',
    columns: [
      { id: 'title', title: 'Task', type: 'text' },
      { id: 'status', title: 'Status', type: 'status' },
      { id: 'priority', title: 'Priority', type: 'status' },
      { id: 'assignee', title: 'Assignee', type: 'person' },
    ],
    items: [
      { 
        id: '1', 
        title: 'Setup CI/CD', 
        status: 'todo',
        priority: 'high',
        assignee: '1'
      },
      { 
        id: '2', 
        title: 'Update dependencies', 
        status: 'in_progress',
        priority: 'medium',
        assignee: '2'
      },
    ],
  },
  {
    id: '3',
    title: 'Marketing',
    columns: [
      { id: 'title', title: 'Campaign', type: 'text' },
      { id: 'status', title: 'Status', type: 'status' },
      { id: 'startDate', title: 'Start Date', type: 'date' },
      { id: 'endDate', title: 'End Date', type: 'date' },
      { id: 'owner', title: 'Owner', type: 'person' },
    ],
    items: [
      { 
        id: '1', 
        title: 'Q1 Social Media Campaign', 
        status: 'planning',
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        owner: '4'
      },
    ],
  },
];

// Constants for column types and their configurations
export const COLUMN_CONFIGS = {
  text: {
    defaultWidth: 200,
    minWidth: 100,
    maxWidth: 500,
  },
  status: {
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 200,
  },
  date: {
    defaultWidth: 150,
    minWidth: 120,
    maxWidth: 200,
  },
  person: {
    defaultWidth: 150,
    minWidth: 120,
    maxWidth: 200,
  },
} as const;

// Workspace sample data
export const SAMPLE_WORKSPACE = {
  id: '1',
  name: 'My Workspace',
  boards: ['1', '2', '3'],
  members: [
    { id: '1', role: 'admin' },
    { id: '2', role: 'member' },
    { id: '3', role: 'member' },
    { id: '4', role: 'member' },
  ],
};