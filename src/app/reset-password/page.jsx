import Link from "next/link";

import "./reset-password.css";

import { Lock } from "lucide-react";

import AuthLogo from "@/components/auth/AuthLogo";

import AuthInput from "@/components/auth/AuthInput";

import AuthCard from "@/components/auth/AuthCard";

export default function ResetPasswordPage() {
  return (
    <div className="reset-page">
      <div className="reset-container">
        {/* LOGO */}

        <AuthLogo />

        {/* CARD */}

        <AuthCard>
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
            icon={
              <Lock
                size={18}
                className="input-icon"
              />
            }
            password
          />

          {/* CONFIRM */}

          <AuthInput
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="••••••••"
            icon={
              <Lock
                size={18}
                className="input-icon"
              />
            }
            password
          />

          {/* BUTTON */}

          <button className="primary-btn">
            Reset password
          </button>

          {/* LOGIN */}

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