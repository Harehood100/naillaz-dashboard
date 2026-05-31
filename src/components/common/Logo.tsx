import Image from "next/image";
import "./Logo.css";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo({
  size = "medium",
}: LogoProps) {
  return (
    <div className={`logo logo-${size}`}>
      <Image
        src="/images/logo.svg"
        alt="Naillaz Logo"
        width={40}
        height={40}
      />
    </div>
  );
}