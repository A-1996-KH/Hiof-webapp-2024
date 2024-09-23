import { readFile, writeFile } from "node:fs/promises";
import type { Project } from "./types";

// Definerer filstien for hvor prosjektdataene er lagret
const PROJECTS_FILE_PATH = './project.json';

// Hent prosjekter fra filen
export const getProjects = async (): Promise<Project[]> => {
  try {
    const data = await readFile(PROJECTS_FILE_PATH, 'utf-8');
    return JSON.parse(data); // Konverter JSON-streng til JavaScript-objekt
  } catch (error) {
    console.error("Failed to read projects:", error);
    return [];
  }
};

// Lagre et nytt prosjekt i filen
export const saveProject = async (newProject: Project): Promise<void> => {
  try {
    const projects = await getProjects(); // Hent eksisterende prosjekter
    projects.push(newProject); // Legg til det nye prosjektet
    await writeFile(PROJECTS_FILE_PATH, JSON.stringify(projects, null, 2)); // Lagre oppdatert prosjektliste til filen
  } catch (error) {
    console.error("Failed to save project:", error);
  }
};
