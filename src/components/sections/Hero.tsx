import "./Hero.css";
import Logo from "@/components/common/Logo";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-top">

          <div className="hero-logo">
            <Logo size="large" />
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