
import React from 'react';
import useProjects from '../hooks/useProject';
import Projects from '../components/Projects';
import CreateProject from '../components/CreateProject';

const ProjectPage: React.FC = () => {
  const { projects, loading, error, addNewProject } = useProjects();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CreateProject onAdd={addNewProject} />
      <Projects projects={projects} onRemove={() => {}} />
    </div>
  );
};

export default ProjectPage;
