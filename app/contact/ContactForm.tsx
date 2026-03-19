"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("idle");

    const formData = new FormData(e.target);

    const res = await fetch("/contact/send", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Honeypot field */}
      <input
        type="text"
        name="company"
        className="hidden-field"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="form-field">
        <label>Name</label>
        <input name="name" required />
      </div>

      <div className="form-field">
        <label>Email</label>
        <input name="email" type="email" required />
      </div>

      <div className="form-field">
        <label>Message</label>
        <textarea name="message" rows={5} required />
      </div>

      <button type="submit" className="btn btn-primary">
        Send message
      </button>

      {status === "success" && (
        <p className="form-success">Thanks! Your message has been sent.</p>
      )}

      {status === "error" && (
        <p className="form-error">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
