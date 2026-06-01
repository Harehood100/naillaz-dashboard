"use client";

import { Search, Bell, ChevronDown, LogOut, UserPlus, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type TopbarProps = {
  title: string;
};

export default function Topbar({ title }: TopbarProps) {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("?");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pull user data from sessionStorage
  useEffect(() => {
    const email = sessionStorage.getItem("pendingVerificationEmail") ?? "";
    const name = sessionStorage.getItem("userName") ?? "";

    setUserEmail(email);
    setUserName(name);

    if (name) {
      const parts = name.trim().split(" ");
      const ini =
        parts.length >= 2
          ? `${parts[0][0]}${parts[parts.length - 1][0]}`
          : parts[0]?.[0] ?? "?";
      setInitials(ini.toUpperCase());
    } else if (email) {
      setInitials(email[0].toUpperCase());
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  const handleAddAccount = () => {
    sessionStorage.clear();
    router.push("/signup");
  };

  return (
    <div className="dashboard-topbar">
      <h1 className="page-title">{title}</h1>

      <div className="topbar-actions">

        {/* Desktop search */}
        <div className="search-container desktop-search">
          <Search size={18} />
          <input type="text" placeholder="Search transactions, reports..." />
        </div>

        {/* Mobile search toggle */}
        <button
          className="icon-btn mobile-search-btn"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {searchOpen ? <X size={20} /> : <Search size={20} />}
        </button>

        <button className="notification-btn">
          <Bell size={20} />
        </button>

        {/* Profile + dropdown */}
        <div className="profile-section" ref={dropdownRef}>
          <div
            className="profile-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="avatar">{initials}</div>

            <div className="profile-info desktop-only">
              <span className="profile-name">{userName || userEmail}</span>
              <span className="profile-email">{userName ? userEmail : ""}</span>
            </div>

            <ChevronDown
              size={16}
              className={`chevron ${dropdownOpen ? "chevron-open" : ""}`}
            />
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">{initials}</div>
                <div>
                  <p className="dropdown-name">{userName || "User"}</p>
                  <p className="dropdown-email">{userEmail}</p>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button className="dropdown-item" onClick={handleAddAccount}>
                <UserPlus size={15} />
                Add another account
              </button>

              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar (expands below topbar) */}
      {searchOpen && (
        <div className="mobile-search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search transactions, reports..." autoFocus />
        </div>
      )}
    </div>
  );
}