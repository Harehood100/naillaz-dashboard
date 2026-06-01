"use client";
import Link from "next/link";
import api from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLogo from "../../components/auth/AuthLogo";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

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

    if (!agreed) {
      newErrors.agreed = "You must agree to the terms";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // ← stop here if validation fails

    setLoading(true);
    setServerError("");

    try {
      await api.post("/auth/signup", {
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email,
        password,
      });

      // Store email for the verify page, then navigate
      sessionStorage.setItem("pendingVerificationEmail", email);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed. Make sure your backend server is active.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  


      const getPasswordStrength = (password) => {
      let score = 0;

      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      return score;
    };

   const strength = getPasswordStrength(password);



  return (
    <div className="signup-page">

      {/* LEFT + RIGHT wrapper */}
      <div className="signup-content">

        {/* LEFT SECTION */}
        <div className="signup-left">
          <div className="auth-logo">
            <AuthLogo />
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
        </div>

        {/* RIGHT SECTION */}
        <div className="signup-right">
          <div className="form-card">
            <form onSubmit={handleSubmit}> 
            <h1>Create Account</h1>

            <p>Set up your free Financial Workspace</p>

            <div className="name-fields">
              <div>
                <label>FIRST NAME</label>
               <input
                type="text"
                 value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>

              <div>
                <label>LAST NAME</label>
                <input
                  type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>
            </div>

            <label>BUSINESS EMAIL</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
               type="email"
               placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <label>PASSWORD</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              {errors.password && <p className="error-text">{errors.password}</p>}
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="password-strength">
                <div
                  className={`strength-bar ${
                    strength >= 1 ? "strength-red" : ""
                  }`}
                ></div>

                <div
                  className={`strength-bar ${
                    strength >= 2 ? "strength-yellow" : ""
                  }`}
                ></div>

                <div
                  className={`strength-bar ${
                    strength >= 3 ? "strength-green" : ""
                  }`}
                ></div>
              </div>

           <small className="strength-text">
          {strength <= 1 &&
            "Weak password - add uppercase letters, numbers, or symbols"}

          {strength === 2 &&
            "Medium strength - add a symbol or number"}

          {strength >= 3 &&
            "Strong password"}
        </small>

            <label>CONFIRM PASSWORD</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                 placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                />
              {errors.agreed && <p className="error-text">{errors.agreed}</p>}
              <p>
                I agree to the <span>Terms of service</span>{" "}
                and <span>Privacy Policy</span>
              </p>
            </div>

            {serverError && (
              <p className="error-text">
                {serverError}
              </p>
            )}

           <button
            type="submit"
            className="continue-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>


            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

           <Link href="/auth/google">
          <button type="button" className="google-btn">
            Sign up with Google
          </button>
        </Link>

           <div className="login-link">
          Already have an account?{" "}
          <Link href="/login">
            <span>Log in</span>
          </Link>
        </div>
              
            </form>  
            </div>  
          </div>

      </div> {/* end .signup-content */}

      <footer>
        ©2026 Naillaz Financial Corp. All rights reserved
      </footer>

    </div>
  );
}
