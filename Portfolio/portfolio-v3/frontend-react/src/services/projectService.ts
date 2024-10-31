
import { API_URL } from '../config';
import { Project } from '../../../backend/src/types';

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const addProject = async (project: Project): Promise<Project> => {
  // Oppdatert URL for å sikre at riktig endepunkt brukes
  const response = await fetch(`${API_URL}/projects`, {  // Oppdater URL til /projects
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    const errorMessage = await response.text();  // Hent feilmelding
    throw new Error(`Failed to add project: ${errorMessage}`);  // Gi mer detaljert feil
  }
  return response.json();
};
