import React, { useState, useEffect } from 'react';
import './styles/main.css';

const App: React.FC = () => {
  const [projects, setProjects] = useState<{ id: string; title: string; description: string }[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Hent prosjekter fra backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3999/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []); // Kjøres kun én gang når komponenten monteres

  // Legg til nytt prosjekt
  const handleAddProject = async () => {
    if (title && description) {
      const newProject = { title, description };

      try {
        const response = await fetch('http://localhost:3999/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
        });

        if (response.ok) {
          const addedProject = await response.json();
          setProjects([...projects, addedProject]); // Oppdater prosjektlisten i state
          setTitle(''); // Nullstill inputfelt
          setDescription('');
        } else {
          console.error("Failed to add project");
        }
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <main>
      <section className="header">
        <h1 className="title">Ahmad Alkhabour</h1>
        <p className="description">Informatikk student - 120 studiepoeng</p>
      </section>

      <section className="experiences">
        <h2 className="title">Experiences</h2>
        <ul>
          <li>Figma UI </li>
          <li>Websites programering </li>
        </ul>
      </section>

      <section className="contact">
        <h2 className="title">Kontakt</h2>
        <button onClick={() => alert('Ahmad.alkh@hiof.no')}>Show Email</button>
      </section>

      <section className="projects">
        <h2 className="title">Projects ({projects.length})</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleAddProject}>Add Project</button>
        </form>

        {projects.length > 0 ? (
          <ul className="project-list">
            {projects.map((project, index) => (
              <li key={index} className="project-item">
                <span>{project.title}</span>
                <span>{project.description}</span>
                <button onClick={() => handleRemoveProject(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects available</p>
        )}
      </section>
    </main>
  );
};

export default App;
