import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getProjects, saveProject } from "./lib";
import { Project } from "./types";

const app = new Hono();

app.use(
  cors({
    origin: "*",
  })
);


// Hent alle prosjekter
app.get("/projects", async (c) => {
  const projects = await getProjects();
  return c.json(projects);
});

// Legg til nytt prosjekt
app.post("/projects", async (c) => {
  const body = await c.req.json<Project>();

  if (!body.title || !body.description) {
    return c.json({ error: "Title and description are required" }, 400);
  }

  const newProject: Project = {
    id: Date.now().toString(), // Enkel generering av ID
    title: body.title,
    description: body.description,
  };

  await saveProject(newProject);
  return c.json({ message: "Project added successfully" }, 201);
});

// Start serveren
const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
