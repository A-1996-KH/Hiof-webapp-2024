import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "../types";
import fs, { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

// Serve statiske filer fra assets mappen
app.use("/assets/*", serveStatic({ root: "./" }));

// Serve statiske filer fra statics (som lages ved build)
app.use("/statics/*", serveStatic({ root: "./" }));

// Setter typen til Projects til å være en array av Project
const projects: Project[] = [
  {
    id: crypto.randomUUID(),
    title: "321",
    description: "123",
  },
];

app.get("/json", async (c) => {
  const data = await fs.readFile("./assets/data.json", "utf8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/api/add", async (c) => {
  const newProject = await c.req.json();
  // Validerer at dataen vi mottar er en gyldig Project
  const project = ProjectSchema.parse(newProject);
  // Sjekker om Project er en gyldig Project, og returnerer en feilmelding hvis ikke
  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  console.log(project);
  projects.push(project);

  const jsonData = await readFile("./assets/data.json", "utf-8");

  const data = JSON.parse(jsonData);

  // Skriver til filen data.json
  await fs.writeFile(
    "./assets/data.json",
    // Legger til den nye Projecten i listen med Projects
    // Bruker JSON.stringify for å konvertere dataen til en JSON-streng
    JSON.stringify([...data, project], null, 2)
  );

  // Returnerer en liste med alle Projects. Bruker generisk type for å fortelle at vi returnerer en array av Project
  return c.json<Project[]>(projects, { status: 201 });
});

const htmlForm = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ahmad Alkhabour</title>
    <link rel="stylesheet" href="./assets/style.css" />
  </head>
  <body>
    <header>
      <h1>Ahmad Alkhabour</h1>
      <nav>
        <a href="#projects">Projects</a>
      </nav>
    </header>

    <p>Legg til ny projekt</p>
    <form id="projectForm">
      <label for="title">Project Title:</label>
      <input type="text" id="title" name="title" required />
      <br />
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" required />
      <br />
      <button type="submit">Add Project</button>
    </form>

    <section id="projects">
      <h2>Projects:</h2>
    <ul id="projectslist">
      
    </ul>
     <pre id="json"></pre>

    <script type="module" src="/main.ts"></script>
  </body>
</html>

`;

app.get("/html", (c) => {
  return c.html(htmlForm);
});

app.get("/api/projects", (c) => {
  // Returnerer en liste med alle Projects. Bruker generisk type for å fortelle at vi returnerer en array av Project
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);


export default app;

serve({
  fetch: app.fetch,
  port
})