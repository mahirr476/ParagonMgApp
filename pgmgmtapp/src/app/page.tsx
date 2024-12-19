// src/app/page.tsx
"use client"

import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BoardComponent from '@/components/board/BoardComponent';
import { useBoardStore } from '@/store/boardStore';
import { SAMPLE_BOARDS } from '@/data/sample-boards';

export default function Home() {
  const { addBoard, setCurrentBoard, boards } = useBoardStore();

  useEffect(() => {
    // Only add sample boards if there are none
    if (boards.length === 0) {
      SAMPLE_BOARDS.forEach(board => addBoard(board));
      setCurrentBoard(SAMPLE_BOARDS[0].id);
    }
  }, [addBoard, setCurrentBoard, boards.length]);

  return (
    <MainLayout>
      <BoardComponent />
    </MainLayout>
  );
}