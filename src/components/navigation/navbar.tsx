import "./navbar.css";
import Logo from "@/components/common/Logo";

import Button from "../UI/button";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo size="small" />
       <span> NAILLAZ</span>
      </div>

      <ul className="navbar-links">
        <li>Features</li>
        <li>Pricing</li>
        <li>Company</li>
      </ul>

      <div className="navbar-actions">
        <button className="login-btn">
          Log In
        </button>

        <Button text="Sign Up" />
      </div>
    </nav>
  );
}