import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="auth-logo">
      <div className="logo-row">
        <Image
          src="/images/logo.svg"
          alt="Naillaz Logo"
          width={20}
          height={19}
        />

        <span>Naillaz</span>
      </div>

      <div className="workspace-badge">
        ✦ FINANCIAL WORKSPACE
      </div>
    </div>
  );
}