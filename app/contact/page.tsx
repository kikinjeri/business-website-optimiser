// app/contact/page.tsx
import ContactForm from "./ContactForm";
import "@/styles/styles.css";

export default function ContactPage() {
  return (
    <main className="contact-page" role="main">
      <header className="contact-header">
        <h1 className="contact-title">Contact Me</h1>
        <p className="contact-subtitle">
          Have questions, feedback, or want to collaborate? I’d love to hear
          from you.
        </p>
        <p className="contact-email">
          You can also email me directly at{" "}
          <a
            href="mailto:githiimwihaki@gmail.com"
            className="contact-email-link"
          >
            githiimwihaki@gmail.com
          </a>
        </p>
      </header>

      <section className="contact-form-section">
        <ContactForm />
      </section>
    </main>
  );
}
