import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import Database from "better-sqlite3";
import { z } from "zod";
import { Project } from "./types";
import { projectSchema } from "../../frontend-react/src/validation/projectValidation";

const db = new Database('projects.db'); // Initialiserer SQLite-databasen
const app = new Hono();

// CORS-innstillinger
app.use(
  cors({
    origin: "*",
  })
);

// Endepunkt for å hente alle prosjekter
app.get('/projects', async (c) => {
  const projects = db.prepare('SELECT * FROM projects').all();
  return c.json({ success: true, data: projects });
});

// Endepunkt for å hente ett prosjekt basert på ID
app.get('/projects/:id', async (c) => {
  const id = c.req.param('id');
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  if (!project) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }
  return c.json({ success: true, data: project });
});

// Endepunkt for å opprette et nytt prosjekt
app.post('/projects', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = projectSchema.parse(body); // Valider prosjektdata

    // Lag et nytt prosjekt i databasen
    const stmt = db.prepare(`
      INSERT INTO projects (id, title, description, publishedAt, public, status, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      Date.now().toString(), // Generer enkel ID
      validatedData.title,
      validatedData.description,
      validatedData.publishedAt || new Date().toISOString(),
      validatedData.public || false,
      validatedData.status || "draft",
      JSON.stringify(validatedData.tags || [])
    );

    return c.json({ success: true, message: "Project added successfully", data: result }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, error: error.errors }, 400);
    }
    return c.json({ success: false, error: "An unexpected error occurred" }, 500);
  }
});

// Endepunkt for å oppdatere et eksisterende prosjekt basert på ID
app.put('/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = projectSchema.parse(body); // Valider prosjektdata

    const stmt = db.prepare(`
      UPDATE projects SET 
        title = ?, 
        description = ?, 
        publishedAt = ?, 
        public = ?, 
        status = ?, 
        tags = ?
      WHERE id = ?
    `);

    const result = stmt.run(
      validatedData.title,
      validatedData.description,
      validatedData.publishedAt,
      validatedData.public,
      validatedData.status,
      JSON.stringify(validatedData.tags || []),
      id
    );

    if (result.changes === 0) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }

    return c.json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, error: error.errors }, 400);
    }
    return c.json({ success: false, error: "An unexpected error occurred" }, 500);
  }
});

// Endepunkt for å slette et prosjekt basert på ID
app.delete('/projects/:id', async (c) => {
  const id = c.req.param('id');
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }

  return c.json({ success: true, message: 'Project deleted successfully' });
});

// Start serveren
const port = 4000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
