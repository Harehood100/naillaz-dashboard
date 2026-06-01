"use client";
import { useState } from "react";
import Link from "next/link";
import "./reset-password.css";

import { Lock } from "lucide-react";

import AuthLogo from "@/components/auth/AuthLogo";

import AuthInput from "@/components/auth/AuthInput";

import AuthCard from "@/components/auth/AuthCard";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // If no errors — show success and redirect to login
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        {/* LOGO */}

        <AuthLogo />

        {/* CARD */}

        <AuthCard>
          <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Reset password</h1>

            <p>
              Create a new secure password for
              your account.
            </p>
          </div>

          {/* PASSWORD */}

         <AuthInput
          label="NEW PASSWORD"
            type="password"
          placeholder="••••••••"
          icon={<Lock size={18} className="input-icon"/>}
          password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
            {errors.password && <p className="error-text">{errors.password}</p>}
      
            password
          

          {/* CONFIRM */}

         <AuthInput
        label="CONFIRM PASSWORD"
          type="password"
        placeholder="••••••••"
          icon={<Lock size={18} className="input-icon"/>}
          password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            
            password
          

          {/* BUTTON */}

         {success ? (
           <p style={{ color: "green", marginTop: "1rem" }}>
            ✅ Password reset successful! Redirecting to login...
        </p>
        ) : (
          <button type="submit" className="primary-btn">
          Reset password
          </button>
            )}

          {/* LOGIN */}

          <div className="back-link">
            <Link href="/login">
              Back to login
            </Link>
          </div>
            </form>
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
