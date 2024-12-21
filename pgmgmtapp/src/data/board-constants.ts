// src/data/board-constants.ts
export const STATUS_OPTIONS = [
    { value: 'Working on it', label: 'Working on it', color: 'bg-orange-400 text-white' },
    { value: 'Done', label: 'Done', color: 'bg-green-500 text-white' },
    { value: 'Not Started', label: 'Not Started', color: 'bg-gray-400 text-white' },
    { value: 'Stuck', label: 'Stuck', color: 'bg-red-500 text-white' }
  ] as const;
  
  export const PRIORITY_OPTIONS = [
    { value: 'High', label: 'High', color: 'bg-indigo-900 text-white' },
    { value: 'Medium', label: 'Medium', color: 'bg-blue-500 text-white' },
    { value: 'Low', label: 'Low', color: 'bg-blue-400 text-white' }
  ] as const;
  
  export const SAMPLE_USERS = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Wilson' },
    { id: '5', name: 'Alex Brown' }
  ];