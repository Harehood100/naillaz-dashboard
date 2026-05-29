import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-divider"></div>

      <div className="footer-content">

        <div className="footer-brand">

          <h3>Naillaz</h3>

          <p>
            Precision engineering for modern
            business financial workflow
          </p>

        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h4>PRODUCT</h4>

            <ul>
              <li>Features</li>
              <li>Security</li>
              <li>Integrations</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>COMPANY</h4>

            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Kit</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>RESOURCES</h4>

            <ul>
              <li>Help Center</li>
              <li>Blog</li>
              <li>Community</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>LEGAL</h4>

            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Security</li>
            </ul>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        ©2026 Naillaz Financial Corp.
        All rights reserved
      </div>

    </footer>
  );
}