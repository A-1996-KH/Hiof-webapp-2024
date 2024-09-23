import React, { useState } from 'react';
import Avatar from './Avatar';

interface StudentProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newName: string) => void;
}

const Student: React.FC<StudentProps> = ({ id, name, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(id, newName);
    setIsEditing(false);
  };

  return (
    <div className="student">
      <Avatar name={name} />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <h2 onClick={() => setIsEditing(true)}>{name}</h2>
          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Student;
