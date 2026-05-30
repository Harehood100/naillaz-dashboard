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

const inputRefs = useRef([]);
const userEmail = "alex-brown@company.com";

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

          <button className="verify-btn">
            Verify
          </button>

                  <button
          className="resend-btn"
          disabled={timer > 0}
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