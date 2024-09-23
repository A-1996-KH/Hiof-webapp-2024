import React from 'react';
import Experience from './Experience';

interface ExperienceProps {
  experiences: { name: string }[];
}

const Experiences: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section className="experiences">
      <h2>experiences</h2>
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <Experience key={index} name={exp.name} />
        ))
      ) : (
        <p>Ingen erfaringer å vise.</p>
      )}
    </section>
  );
}

export default Experiences;
