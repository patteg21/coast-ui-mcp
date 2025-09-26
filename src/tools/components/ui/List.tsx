import React from 'react';
import { ListProps } from '../types.js';

export const List: React.FC<ListProps> = ({
  items,
  ordered = false,
}) => {
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal list-inside space-y-2' : 'list-disc list-inside space-y-2';

  return (
    <ListTag className={listClass}>
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">{item}</li>
      ))}
    </ListTag>
  );
};