import React from 'react';

interface ExperienceProps {
  name: string;
}

const Experience: React.FC<ExperienceProps> = ({ name }) => {
  return (
    <div className="experience">
      <p>{name}</p>
    </div>
  );
}

export default Experience;
