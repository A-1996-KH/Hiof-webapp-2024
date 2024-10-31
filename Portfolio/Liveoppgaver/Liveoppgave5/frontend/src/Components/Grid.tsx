import React, { useState } from 'react';
import Student from './Student';
import AddStudentForm from './AddStudentForm';

interface Student {
  id: number;
  name: string;
}

interface GridProps {
  students: Student[];
  onDelete: (id: number) => void;
  onAddStudent: (name: string) => void;
  onUpdate: (id: number, newName: string) => void;
}

const Grid: React.FC<GridProps> = ({ students, onDelete, onAddStudent, onUpdate }) => {
  const [studentsList, setStudentsList] = useState<Student[]>(students);

  const removeStudent = (id: number) => {
    setStudentsList((prev) => prev.filter((student) => student.id !== id));
    onDelete(id); // Call the delete function passed from App
  };

  return (
    <div className="grid">
      <AddStudentForm onAddStudent={onAddStudent} />
      {studentsList.map((student) => (
        <Student
          key={student.id}
          id={student.id}
          name={student.name}
          onDelete={removeStudent}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default Grid;
