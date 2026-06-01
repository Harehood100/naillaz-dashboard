"use client";

import { useState, useRef, useEffect } from "react";

import "./verify.css";

import AuthLogo from "@/components/auth/AuthLogo";
import AuthCard from "@/components/auth/AuthCard";

export default function VerifyPage() {

  const [timer, setTimer] =
  useState(30);

useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () =>
    clearInterval(interval);
}, [timer]);


  const [otp, setOtp] = useState([
  "",
  "",
  "",
  "",
  "",
  "",
]);
  const [error, setError] = useState("");

const inputRefs = useRef([]);
const userEmail = "alex-brown@company.com";

const handleVerify = () => {
  // Join all 6 digits into one string
  const otpValue = otp.join("");

  // Check if all 6 digits are filled
  if (otpValue.length < 6) {
    setError("Please enter the complete 6-digit code");
    return;
  }

  // Check if any digit is empty
  if (otp.includes("")) {
    setError("Please fill in all 6 digits");
    return;
  }

  // If valid — redirect to dashboard
  console.log("OTP submitted:", otpValue);
  window.location.href = "/dashboard";
};

const handleChange = (
  value,
  index
) => {
  if (!/^\d*$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;

  setOtp(newOtp);

  if (
    value &&
    index < otp.length - 1
  ) {
    inputRefs.current[index + 1]?.focus();
  }
};

const handleKeyDown = (
  e,
  index
) => {
  if (
    e.key === "Backspace" &&
    !otp[index] &&
    index > 0
  ) {
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

            <p>
              We've sent a 6-digit code to
            </p>

            <span className="email-highlight">
              {userEmail}
            </span>
          </div>


          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) =>
                  (inputRefs.current[index] = el)
                }
                value={digit}
                maxLength={1}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
              />
            ))}
          </div>
              {error && (
              <p style={{
              color: "red",
              fontSize: "13px",
              textAlign: "center",
              marginBottom: "0.5rem"
              }}>
              {error}
              </p>
                )}

         <button className="verify-btn" onClick={handleVerify}>
            Verify
          </button>

                <button
                className="resend-btn"
                  disabled={timer > 0}
                  onClick={() => {
                  setTimer(30);  // reset timer back to 30
                  setOtp(["","","","","",""]); // clear the OTP inputs
                    setError(""); // clear any error
                     console.log("OTP resent");
                      }}
                      >
                  {timer > 0
                  ? `Resend in ${timer}s`
                  : "Resend OTP"}
              </button>
        
        </AuthCard>

        <footer>
          ©2026 Naillaz Financial Corp.
          All rights reserved.
        </footer>
      </div>
    </div>
  );
}
