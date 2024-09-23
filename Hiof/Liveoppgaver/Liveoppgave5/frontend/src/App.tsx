import React from 'react';
import Grid from './Components/Grid';
import Total from './Components/Total';

interface Student {
  id: number;
  name: string;
}

const initialStudents: Student[] = [
  { id: 1, name: 'Ahmad Alkhaboue' },
  { id: 2, name: 'Kari Nordmann' },
  { id: 3, name: 'Per Hansen' },
];

const App: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>(initialStudents);

  const removeStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const updateStudent = (id: number, newName: string) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, name: newName } : student))
    );
  };

  const addStudent = (name: string) => {
    const newStudent = { id: Date.now(), name }; // Use timestamp as a unique ID
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <div>
      <h1>Student List</h1>
      <Total total={students.length} />
      <Grid students={students} onDelete={removeStudent} onUpdate={updateStudent} onAddStudent={addStudent} />
    </div>
  );
};

export default App;
