// src/types/board.ts
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

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  items: BoardItem[];
}