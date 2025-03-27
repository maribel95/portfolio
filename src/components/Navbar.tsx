// src/components/Navbar.tsx
import React from "react";
import "@styles/Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img
          src="/Logo.svg"
          alt="Logo Pollos Hermanos"
          className="navbar-logo"
        />
        <ul className="navbar-menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#resume">Resume</a>
          </li>
          <li>
            <a href="#blogs">Blogs</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
