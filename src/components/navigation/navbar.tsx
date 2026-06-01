"use client";
import "./navbar.css";
import Logo from "@/components/common/Logo";
import Button from "../UI/button";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo size="small" />
        <span>NAILLAZ</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => setMenuOpen(false)}>Features</li>
        <li onClick={() => setMenuOpen(false)}>Pricing</li>
        <li onClick={() => setMenuOpen(false)}>Company</li>
      </ul>

      <div className={`navbar-actions ${menuOpen ? "open" : ""}`}>
        <button className="login-btn">Log In</button>
        <Button text="Sign Up" />
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}