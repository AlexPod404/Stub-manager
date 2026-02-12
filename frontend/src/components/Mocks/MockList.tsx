import React from 'react';

interface MockListProps {
  mocks: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MockList: React.FC<MockListProps> = ({ mocks, onEdit, onDelete }) => {
  return (
    <div>
      {/* TODO: Implement mock list component */}
    </div>
  );
};

export default MockList;
