


export type Project = {
  id: string; 
  title: string;
  description: string;
  publishedAt?: string; // optional
  public?: boolean; // optional
  status?: 'draft' | 'published'; // optional
  tags?: string[]; // optional
};



export type Experience = {
  name: string;
};


