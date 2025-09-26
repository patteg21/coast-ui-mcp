import React from 'react';
import { GridProps } from '../types.js';

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  children,
}) => {
  const getGridCols = (cols: number) => {
    const colMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6',
    };
    return colMap[cols] || `grid-cols-${cols}`;
  };

  return (
    <div className={`grid gap-6 ${getGridCols(columns)}`}>
      {children}
    </div>
  );
};