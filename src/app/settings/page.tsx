"use client";

import { useState, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import "./settings.css";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Naillaz Solutions Inc");
  const [industry, setIndustry] = useState("Financial Services");
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [startTime, setStartTime] = useState("10:00PM");
  const [endTime, setEndTime] = useState("07:00AM");
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDiscard = () => {
    setBusinessName("Naillaz Solutions Inc");
    setIndustry("Financial Services");
    setLogo(null);
    setPushAlerts(true);
    setEmailDigest(true);
    setSmsUpdates(false);
    setStartTime("10:00PM");
    setEndTime("07:00AM");
  };

  return (
    <AppLayout title="Settings" activePage="settings">
      <div className="settings-content">

        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your business profile, linked accounts, and notification preferences.
          </p>
        </div>

        {/* PROFILE */}
        <div className="settings-section">
          <h2 className="section-heading">
            <span className="section-icon">👤</span> Profile
          </h2>
          <div className="settings-card">
            <div className="profile-grid">
              <div className="profile-fields">
                <div className="field-group">
                  <label className="field-label">Business Name</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="field-divider"></div>
                <div className="field-group">
                  <label className="field-label">Industry</label>
                  <input
                    type="text"
                    className="settings-input full-width"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>
              </div>
              <div className="logo-upload" onClick={() => fileInputRef.current?.click()}>
                {logo ? (
                  <img src={logo} alt="Logo" className="logo-preview" />
                ) : (
                  <div className="logo-placeholder">
                    <div className="logo-initials">NF</div>
                  </div>
                )}
                <p className="logo-upload-text">
                  Upload Logo<br />SVG, PNG (max<br />800×800)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".svg,.png,.jpg"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LINKED ACCOUNTS */}
        <div className="settings-section">
          <h2 className="section-heading">
            <span className="section-icon">🏦</span> Linked Accounts
          </h2>
          <div className="settings-card">
            <div className="account-item">
              <div className="account-info">
                <p className="account-name">🏦 Chase Business Checking</p>
                <p className="account-meta">*****4412. Connected 3 months ago</p>
              </div>
              <button className="manage-btn">Manage</button>
            </div>
            <div className="account-divider"></div>
            <div className="account-item">
              <div className="account-info">
                <p className="account-name">💳 American Express Platinum</p>
                <p className="account-meta">****8001. Connected 1 year ago</p>
              </div>
              <button className="manage-btn">Manage</button>
            </div>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCES */}
        <div className="settings-section">
          <h2 className="section-heading">
            <span className="section-icon">🔔</span> Notification Preferences
          </h2>
          <div className="settings-card">
            <div className="toggle-item">
              <div className="toggle-info">
                <p className="toggle-title">Push Alerts</p>
                <p className="toggle-desc">Instant mobile updates</p>
              </div>
              <button
                className={`toggle-switch ${pushAlerts ? "on" : ""}`}
                onClick={() => setPushAlerts(!pushAlerts)}
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <div className="toggle-divider"></div>
            <div className="toggle-item">
              <div className="toggle-info">
                <p className="toggle-title">Email Digest</p>
                <p className="toggle-desc">Daily summary reports</p>
              </div>
              <button
                className={`toggle-switch ${emailDigest ? "on" : ""}`}
                onClick={() => setEmailDigest(!emailDigest)}
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <div className="toggle-divider"></div>
            <div className="toggle-item">
              <div className="toggle-info">
                <p className="toggle-title">SMS Updates</p>
                <p className="toggle-desc">Critical Security alerts</p>
              </div>
              <button
                className={`toggle-switch ${smsUpdates ? "on" : ""}`}
                onClick={() => setSmsUpdates(!smsUpdates)}
              >
                <div className="toggle-thumb"></div>
              </button>
            </div>

            {/* QUIET HOURS */}
            <div className="quiet-hours">
              <h3 className="quiet-hours-title">
                <span>🌙</span> Quiet Hours
              </h3>
              <div className="quiet-hours-grid">
                <div className="field-group">
                  <label className="field-label">Start Time</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">End Time</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="settings-actions">
          <button className="discard-btn" onClick={handleDiscard}>
            Discard Changes
          </button>
          <button className="save-btn" onClick={handleSave}>
            {saved ? "✅ Saved!" : "Saves Preferences"}
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
