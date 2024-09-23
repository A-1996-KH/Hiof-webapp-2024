import React, { useState } from 'react';

interface AddStudentFormProps {
  onAddStudent: (name: string) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAddStudent }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddStudent(name);
      setName(''); // Tømmer input etter innsending
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
