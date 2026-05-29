"use client";

import { useState } from "react";
import "./signup.css";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-page">
      {/* LEFT SECTION */}
      <div className="signup-left">
        <div className="logo-section">
          <h3>NAILLAZ</h3>
          <span>✦ FINANCIAL WORKSPACE</span>
        </div>

        <div className="left-content">
          <h1>Start managing your money with clarity.</h1>

          <p>
            Join over 2,500 businesses. Setup takes less than 2 minutes.
          </p>

          <ul>
            <li>14-day free trial, no card required</li>
            <li>Unlimited transaction tracking</li>
            <li>Cancel anytime</li>
          </ul>

          <div className="stats">
            <div>
              <h2>2,500+</h2>
              <p>Businesses using Naillaz</p>
            </div>

            <div>
              <h2>$4.2B</h2>
              <p>Transactions tracked</p>
            </div>

            <div>
              <h2>14-day</h2>
              <p>free trial, no card needed</p>
            </div>
          </div>
        </div>

        <footer>
          ©2026 Naillaz Financial Corp. All rights reserved
        </footer>
      </div>

      {/* RIGHT SECTION */}
      <div className="signup-right">
        <div className="form-card">
          <h1>Create Account</h1>

          <p>Set up your free Financial Workspace</p>

          <div className="name-fields">
            <div>
              <label>FIRST NAME</label>
              <input type="text" />
            </div>

            <div>
              <label>LAST NAME</label>
              <input type="text" />
            </div>
          </div>

          <label>BUSINESS EMAIL</label>

          <div className="input-wrapper">
     <Mail size={18} className="input-icon" />

  <input
    type="email"
    placeholder="name@company.com"
  />
 </div>

          <label>PASSWORD</label>
          <div className="input-wrapper">
  <Lock size={18} className="input-icon" />

  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
  />

        <button
          type="button"
          className="eye-btn"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

          <div className="password-strength">
            <div className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>

          <small>
            Medium strength - add a symbol strengthen
          </small>

          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            placeholder="••••••••"
          />

          <div className="terms">
            <input type="checkbox" />

            <p>
              I agree to the <span>Terms of service</span>{" "}
              and <span>Privacy Policy</span>
            </p>
          </div>

          <button className="continue-btn">
            Continue
          </button>

          <div className="divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <button className="google-btn">
            Sign up with Google
          </button>

          <div className="login-link">
            Already have an account? <span>Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
}