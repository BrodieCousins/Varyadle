import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">Varyadle</h1>
      <p className="subtitle">A word game about my love &lt;3</p>
    </header>
  );
};

export default Header;