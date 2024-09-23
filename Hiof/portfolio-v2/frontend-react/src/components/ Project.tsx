import React from 'react';

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  onRemove: (id: string) => void;
}

const Project: React.FC<ProjectProps> = ({ id, title, description, onRemove }) => {
  return (
    <div className="project">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
}

export default Project;
