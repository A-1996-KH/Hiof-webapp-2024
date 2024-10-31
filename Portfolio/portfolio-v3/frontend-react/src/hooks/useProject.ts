
import { useState, useEffect } from 'react';
import { Project } from '../../../backend/src/types';
import { fetchProjects, addProject } from '../services/projectService';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const addNewProject = async (project: Project) => {
    const newProject = await addProject(project);
    setProjects((prev) => [...prev, newProject]);
  };

  return { projects, loading, error, addNewProject };
};

export default useProjects;
