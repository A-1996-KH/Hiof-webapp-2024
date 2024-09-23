import React, { useState } from 'react';
import '. /styles/main.css';
interface CreateProjectProps {
  onAdd: (project: { id: string; title: string; description: string }) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now().toString(),
      title,
      description
    };
    onAdd(newProject);
    setTitle('');
    setDescription('');
  };

  return (
    <section className="create-project">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default CreateProject;
