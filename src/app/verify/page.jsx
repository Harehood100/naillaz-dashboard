"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import "./verify.css";
import api from "@/utils/api";

import AuthLogo from "@/components/auth/AuthLogo";
import AuthCard from "@/components/auth/AuthCard";

export default function VerifyPage() {
  const router = useRouter();

  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const [userEmail, setUserEmail] = useState("");

useEffect(() => {
  const email = sessionStorage.getItem("pendingVerificationEmail") ?? "";
  setUserEmail(email);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // --- Verify OTP ---
  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length < 6 || otp.includes("")) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/verify-otp",
         { email: userEmail, otp: otpValue });

      sessionStorage.removeItem("pendingVerificationEmail");
      router.push("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP ---
  const handleResend = async () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");

    try {
      await api.post("/auth/verify-otp/resend", { email: userEmail });
    } catch {
      setError("Failed to resend code. Please try again.");
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <AuthLogo />

        <AuthCard>
          <div className="verify-header">
            <h1>Verify Your Identity</h1>
            <p>We've sent a 6-digit code to</p>
            <span className="email-highlight">{userEmail}</span>
          </div>

          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                disabled={loading}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "13px", textAlign: "center", marginBottom: "0.5rem" }}>
              {error}
            </p>
          )}

          <button className="verify-btn" onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>

          <button
            className="resend-btn"
            disabled={timer > 0 || loading}
            onClick={handleResend}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </AuthCard>

        <footer>©2026 Naillaz Financial Corp. All rights reserved.</footer>
      </div>
    </div>
  );
}