import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="page-shell" aria-labelledby="about-title">
      <div className="page-container about-page">
        <header className="about-header">
          <h1 id="about-title" className="page-title">
            About
          </h1>
        </header>

        {/* HERO SECTION */}
        <section className="about-hero about-hero--right">
          <div className="about-text">
            <p className="page-intro">
              Hi, I’m Mwihaki — a web developer in Ottawa passionate about
              helping local businesses shine online.
            </p>
          </div>

          <div className="about-image-wrapper">
            <Image
              src="/images/two.jpg"
              alt="Mwihaki, Ottawa-based web developer"
              className="about-image"
              width={130}
              height={130}
            />
          </div>
        </section>

        {/* WHY I BUILT THIS */}
        <section className="guide-section" aria-labelledby="why-built">
          <h2 id="why-built" className="section-title">
            Why I Built This
          </h2>
          <p className="section-text">
            I believe every small business deserves a strong online profile.
            Business Website Optimiser was created to make essential web
            services affordable and accessible, so local businesses can amplify
            their reach and connect with more customers. My goal is to make
            online marketing simple, effective, and within reach for everyone.
          </p>
        </section>

        {/* CONTACT */}
        <section className="guide-section" aria-labelledby="get-in-touch">
          <h2 id="get-in-touch" className="section-title">
            Get in Touch
          </h2>
          <p className="section-text">
            If you’d like to connect, you can reach me at:
          </p>

          <p className="section-text">
            <strong>Phone:</strong> (xxx) xxx‑xxxx
            <br />
            <strong>Email:</strong> example@email.com
          </p>
        </section>

        <footer className="guide-footer">
          <p>© {new Date().getFullYear()} Business Website Optimiser</p>
        </footer>
      </div>
    </main>
  );
}
