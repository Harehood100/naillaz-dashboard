import Link from "next/link";

import "./login.css";

import {
  Mail,
  Lock,
} from "lucide-react";

import AuthLogo from "@/components/auth/AuthLogo";

import AuthInput from "@/components/auth/AuthInput";

import AuthCard from "@/components/auth/AuthCard";

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login successful");
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
              Please sign in to track revenue, manage expenses, and hit your savings goals - all in one place. 
            </p>
          </div>

          {/* EMAIL */}

          <AuthInput
        label="EMAIL ADDRESS"
        type="email"
        placeholder="name@company.com"
         value={email}
        onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
        <p className="error-text">
        {errors.email}
          </p>
          )}
        icon={
        <Mail
          size={18}
          className="input-icon"
        />
        }
        />

          {/* PASSWORD */}

          <div className="password-row">
            <label>PASSWORD</label>

            <span className="forgot-password">
              Forgot password?
            </span>
          </div>

           <AuthInput
          type="password"
          placeholder="••••••••"
             value={password}
onChange={(e) =>
  setPassword(e.target.value)
}
        {errors.password && (
  <p className="error-text">
    {errors.password}
  </p>
)}     
          icon={
          <Lock
            size={18}
            className="input-icon"
          />
          }
        password
        />

          {/* REMEMBER */}

          <div className="remember-row">
            <div className="remember-me">
              <input type="checkbox" />

              <p>
                Remember me
              </p>
            </div>
          </div>

          {/* BUTTON */}

          <button className="login-btn">
            Log in
          </button>

          {/* SIGNUP */}

          <div className="signup-link">
            Don’t have an account?{" "}

            <Link href="/signup">
              <span>Sign up</span>
            </Link>
          </div>
            <form onSubmit={handleSubmit}>
               ...
          </form>
          </AuthCard>
        </AuthCard>

        {/* FOOTER */}

        <footer>
          ©2026 Naillaz Financial Corp.
          All rights reserved.
        </footer>
      </div>
    </div>
  );
}
