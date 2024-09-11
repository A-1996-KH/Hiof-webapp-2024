import React from 'react';

interface HeaderProps {
  student: {
    name: string;
    degree: string;
    points: number;
  };
}

const Header: React.FC<HeaderProps> = ({ student }) => {
  return (
    <header className="header">
      <h1 className="name">{student.name}</h1>
      <p className="degree">{student.degree} - {student.points} studiepoeng</p>
    </header>
  );
}

export default Header;
