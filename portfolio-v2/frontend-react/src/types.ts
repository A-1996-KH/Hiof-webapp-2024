

export type Project = {
  id: string; 
  title: string;
  description: string;
};


export type Experience = {
  name: string;
};

export type Student = {
  name: string;
  degree: string;
  points: number;
  email: string;
  experiences: Experience[];
};
