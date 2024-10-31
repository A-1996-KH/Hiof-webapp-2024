
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <header>My Application</header>
      <main>{children}</main>
      <footer>© 2024 My Application</footer>
    </div>
  );
};

export default Layout;
