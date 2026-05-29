import Link from "next/link";

import "./forgot-password.css";

import { Mail } from "lucide-react";

import AuthLogo from "@/components/auth/AuthLogo";

import AuthInput from "@/components/auth/AuthInput";

import AuthCard from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-page">
      <div className="forgot-container">
        {/* LOGO */}

        <AuthLogo />

        {/* CARD */}

        <AuthCard>
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
            icon={
              <Mail
                size={18}
                className="input-icon"
              />
            }
          />

          {/* BUTTON */}

          <button className="primary-btn">
            Send reset link
          </button>

          {/* BACK */}

          <div className="back-link">
            <Link href="/login">
              Back to login
            </Link>
          </div>
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