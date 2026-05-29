import "./About.css";
import Navbar from "../navigation/navbar";
import Button from "../UI/button";
import Image from "next/image";
import Footer from "../layout/Footer";

export default function About() {
  return (
    <section className="about">

      <Navbar />

      <div className="about-divider"></div>

      <div className="about-row-one">

        <div className="workspace-card">

          <Image
            src="/workspace-icon.svg"
            alt="Workspace Icon"
            width={18}
            height={18}
          />

          <span>FINANCIAL WORKSPACE</span>

        </div>

        <h2>
          Manage your business cash flow with clarity{" "}
          <span>clarity</span>
        </h2>

        <p>
          A unified workspace for tracking revenues,managing expenses, and securing your company’s financial future without the complexity.
        </p>

        <Button text="Get Started" />

      </div>


      <div className="about-divider"></div>

<div className="about-row-two">

  <div className="stats-card">

    <div className="stat-item">
      <h3>2500+</h3>
      <p>Businesses using Naillaz</p>
    </div>

    <div className="stat-item">
      <h3>$4.2B</h3>
      <p>Transactions tracked</p>
    </div>

    <div className="stat-item">
      <h3>14-Day</h3>
      <p>Free Trial</p>
    </div>

  </div>

  <div className="about-info-split">

    <div className="about-left-info">

      <div className="feature-item">
        <p>• Set Saving Goals</p>
        <span>✓</span>
      </div>

      <div className="feature-item">
        <p>• Track Income</p>
        <span>✓</span>
      </div>

      <div className="feature-item">
        <p>• Analyze Expenses</p>
        <span>✓</span>
      </div>

</div>

    <div className="vertical-line"></div>

    <div className="about-right-info">

      <p>
        “ The architectural simplicity of Naillaz transformed how we view our daily operations. We stopped chasing receipts and started making strategic decisions based on actual data.”
      </p>

      <span>
        — Marcus Thorne
        Founder & CEO Linear Labs.
      </span>

        
      

    </div>

  </div>

  <div className="cta-card">

    <h3>
      Ready to gain total control?
    </h3>

    <p>
      Join  over 2,500 businesses using Naillaz to streamline their financial architecture. No credit card required to start your 14-day trial.
    </p>

    <Button text="Start Your Free Trial" />

  </div>

</div>

  <Footer />

    </section>

  );
}

 