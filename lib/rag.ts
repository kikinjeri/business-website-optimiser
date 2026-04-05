// lib/rag.ts
// Minimal, extensible RAG pipeline for your SaaS

import crypto from "crypto";

// -------------------------------
// 1. Chunking
// -------------------------------
export function chunkText(text: string, size = 500, overlap = 50) {
  const chunks: string[] = [];
  let i = 0;

  while (i < text.length) {
    const chunk = text.slice(i, i + size);
    chunks.push(chunk);
    i += size - overlap;
  }

  return chunks;
}

// -------------------------------
// 2. Embedding (placeholder)
// Replace with Supabase or OpenAI when ready
// -------------------------------
export async function embed(text: string): Promise<number[]> {
  // Temporary deterministic embedding so your pipeline works offline
  const hash = crypto.createHash("sha256").update(text).digest();

  // Convert hash bytes → float array
  return Array.from(hash).map((b) => b / 255);
}

// -------------------------------
// 3. In‑memory vector store
// Replace with Supabase pgvector later
// -------------------------------
type VectorRecord = {
  id: string;
  text: string;
  embedding: number[];
};

const vectorStore: VectorRecord[] = [];

export async function addToVectorStore(text: string) {
  const embedding = await embed(text);

  const record: VectorRecord = {
    id: crypto.randomUUID(),
    text,
    embedding,
  };

  vectorStore.push(record);
  return record.id;
}

// -------------------------------
// 4. Cosine similarity
// -------------------------------
function cosine(a: number[], b: number[]) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}

// -------------------------------
// 5. Retrieval
// -------------------------------
export async function retrieve(query: string, k = 5) {
  const qEmbed = await embed(query);

  const scored = vectorStore
    .map((rec) => ({
      ...rec,
      score: cosine(qEmbed, rec.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored;
}

// -------------------------------
// 6. Generate (placeholder)
// You’ll plug in your LLM here later
// -------------------------------
export async function generateAnswer(query: string) {
  const results = await retrieve(query);

  const context = results.map((r) => r.text).join("\n\n");

  return `
QUESTION:
${query}

CONTEXT:
${context}

DRAFT ANSWER:
(Your LLM goes here)
  `.trim();
}
