"use client";
import { useState } from "react";
import Link from "next/link";
import "./forgot-password.css";

import { Mail } from "lucide-react";

import AuthLogo from "@/components/auth/AuthLogo";

import AuthInput from "@/components/auth/AuthInput";

import AuthCard from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    setSent(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        {/* LOGO */}

        <AuthLogo />

        {/* CARD */}

        <AuthCard>
            <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Forgot password?</h1>

            <p>
              No worries. Enter your email and
              we’ll send you reset instructions.
            </p>
          </div>

          {/* EMAIL */}

          <AuthInput
            label="EMAIL ADDRESS"
             type="email"
              placeholder="name@company.com"
                icon={<Mail size={18} className="input-icon"/>}
                  value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
              {error && <p className="error-text">{error}</p>}
            }
          />

          {/* BUTTON */}

          {sent ? (
          <p style={{ color: "green", marginTop: "1rem" }}>
              ✅ Reset link sent! Check your email.
            </p>
          ) : (
           <button type="submit" className="primary-btn">
            Send reset link
            </button>
            )}

          {/* BACK */}

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
