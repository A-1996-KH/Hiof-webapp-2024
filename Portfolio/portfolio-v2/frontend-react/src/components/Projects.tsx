import React from 'react';
import Project from './ Project';

interface ProjectProps {
  projects: { id: string; title: string; description: string }[];
  onRemove: (id: string) => void;
}

const Projects: React.FC<ProjectProps> = ({ projects, onRemove }) => {
  return (
    <section className="projects">
      <h2>Projects ({projects.length})</h2>
      {projects.length > 0 ? (
        projects.map(project => (
          <Project
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            onRemove={onRemove}
          />
        ))
      ) : (
        <p>No projects available.</p>
      )}
    </section>
  );
}

export default Projects;
