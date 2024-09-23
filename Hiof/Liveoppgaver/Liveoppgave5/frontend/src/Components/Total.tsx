import React from 'react';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = ({ total }) => {
  return <h3>Total students: {total}</h3>;
};

export default Total;

