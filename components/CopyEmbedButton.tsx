"use client";

export default function CopyEmbedButton({ code }: { code: string }) {
  return (
    <button
      className="copy-embed-btn"
      onClick={() => navigator.clipboard.writeText(code)}
    >
      Copy embed code
    </button>
  );
}
