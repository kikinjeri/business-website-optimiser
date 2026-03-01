export function formatTelephone(phone: string) {
  // Basic formatting: (613) 555‑1234
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}‑${cleaned.slice(6)}`;
  }
  return phone;
}
