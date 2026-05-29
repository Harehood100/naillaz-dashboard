"use client";

import { useState } from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthInput({
  label,
  type,
  placeholder,
  icon,
  password = false,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="form-group">
      {label && <label>{label}</label>}

      <div className="input-wrapper">
        {icon}

        <input
          type={
            password
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
        />

        {password && (
          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}