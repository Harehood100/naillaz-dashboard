import "./Hero.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-top">

          <div className="hero-logo">
            <Image
              src="/logo.png"
              alt="Naillaz Logo"
              width={70}
              height={70}
            />
          </div>

          <div className="hero-text">

            <div className="circle-bg"></div>

            <h1>NAILLAZ</h1>

            <div className="hero-line"></div>

            <h2>FINANCE</h2>

            <p>Spend Smart, Save More</p>

          </div>

        </div>

      </div>
    </section>
  );
}