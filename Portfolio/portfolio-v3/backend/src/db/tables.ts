import Database from 'better-sqlite3';

const db = new Database('projects.db');

// Function to create the projects table
export function createTables() {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,               -- Endret fra 'name' til 'title'
        description TEXT,
        publishedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        public BOOLEAN NOT NULL DEFAULT TRUE,
        status TEXT,                       -- Kan være 'draft' eller 'published'
        tags TEXT                          -- Kan lagres som en JSON-streng
      )
    `).run();
  }
  