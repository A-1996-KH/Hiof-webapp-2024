import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

// Dummy list of students
let students = [
  { id: 1, name: 'Ola Nordmann' },
  { id: 2, name: 'Kari Nordmann' },
  { id: 3, name: 'Per Hansen' },
];

// Get all students
app.get('/api/students', (c) => {
  return c.json(students);
});

// Add a new student
app.post('/api/students', async (c) => {
  const newStudent = await c.req.json();
  newStudent.id = Date.now(); // Unique ID based on timestamp
  students.push(newStudent);
  return c.json(newStudent, 201);
});

// Delete a student
app.delete('/api/students/:id', (c) => {
  const id = Number(c.req.param('id'));
  students = students.filter(student => student.id !== id);
  return c.json({ message: 'Student deleted' });
});

// Update a student's name
app.patch('/api/students/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { name } = await c.req.json();
  const student = students.find(student => student.id === id);
  if (student) {
    student.name = name;
    return c.json(student);
  }
  return c.json({ message: 'Student not found' }, 404);
});

const port = 3999;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
