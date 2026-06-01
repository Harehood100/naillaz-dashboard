"use client";
import api from "@/utils/api";

import Link from "next/link";
import "./login.css";
import { Mail, Lock } from "lucide-react";
import AuthLogo from "@/components/auth/AuthLogo";
import AuthInput from "@/components/auth/AuthInput";
import AuthCard from "@/components/auth/AuthCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const data = res.data; // ✅ axios: no `await` needed, and it's res.data not res.data()

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      router.push("/dashboard");
    } catch (err) {
      // Axios throws on 4xx/5xx — extract message from response if available
      const message = err.response?.data?.message ?? "Invalid email or password.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <AuthLogo />
        <AuthCard>
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h1>Welcome back to your financial workspace</h1>
              <p>
                Please sign in to track revenue, manage expenses, and hit your
                savings goals - all in one place.
              </p>
            </div>

            <AuthInput
              label="EMAIL ADDRESS"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} className="input-icon" />}
            />  {/* ✅ closed */}
            {errors.email && <p className="error-text">{errors.email}</p>}

            <div className="password-row">
              <label>PASSWORD</label>
              <Link href="/forgot-password">
                <span className="forgot-password">Forgot password?</span>
              </Link>
            </div>

            <AuthInput
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} className="input-icon" />}
              password
            />  {/* ✅ closed */}
            {errors.password && <p className="error-text">{errors.password}</p>}

            {apiError && <p className="error-text api-error">{apiError}</p>}

            <div className="remember-row">
              <div className="remember-me">
                <input type="checkbox" />
                <p>Remember me</p>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="signup-link">
              Don't have an account?{" "}
              <Link href="/signup">
                <span>Sign up</span>
              </Link>
            </div>
          </form>
        </AuthCard>

        <footer>©2026 Naillaz Financial Corp. All rights reserved.</footer>
      </div>
    </div>
  );
}