"use client";

import Link from "next/link";
import "./login.css";
import { Mail, Lock } from "lucide-react";
import AuthLogo from "@/components/auth/AuthLogo";
import AuthInput from "@/components/auth/AuthInput";
import AuthCard from "@/components/auth/AuthCard";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

 const handleSubmit = (e) => {
  e.preventDefault();
  let newErrors = {};

  // Check email is not empty
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Check email format
    newErrors.email = "Enter a valid email address";
  }

  // Check password
  if (!password.trim()) {
    newErrors.password = "Password is required";
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  setErrors(newErrors);

  // If no errors — navigate to dashboard
  if (Object.keys(newErrors).length === 0) {
    window.location.href = "/dashboard"; // ← redirect
  }
};
  return (
    <div className="login-page">
      <div className="login-container">
        {/* LOGO */}
        <AuthLogo />

        {/* CARD */}
        <AuthCard>
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h1>Welcome back to your financial workspace</h1>
              <p>
                Please sign in to track revenue, manage expenses, and hit your
                savings goals - all in one place.
              </p>
            </div>

            {/* EMAIL */}
            <AuthInput
              label="EMAIL ADDRESS"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} className="input-icon" />}
            />
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}

            {/* PASSWORD */}
            <div className="password-row">
              <label>PASSWORD</label>
              <span className="forgot-password">Forgot password?</span>
            </div>

            <AuthInput
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} className="input-icon" />}
              password
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}

            {/* REMEMBER */}
            <div className="remember-row">
              <div className="remember-me">
                <input type="checkbox" />
                <p>Remember me</p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="login-btn">Log in</button>

            {/* SIGNUP */}
            <div className="signup-link">
              Don't have an account?{" "}
              <Link href="/signup">
                <span>Sign up</span>
              </Link>
            </div>
          </form>
        </AuthCard>

        {/* FOOTER */}
        <footer>©2026 Naillaz Financial Corp. All rights reserved.</footer>
      </div>
    </div>
  );
}
