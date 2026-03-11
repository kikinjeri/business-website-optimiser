"use client";

export default function CopyEmbedButton({ code }: { code: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(code)}
      style={{
        padding: "8px 14px",
        background: "#1e293b",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 600,
        marginBottom: "12px",
      }}
    >
      Copy embed code
    </button>
  );
}
