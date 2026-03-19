// File: app/business/[slug]/embed-code/page.tsx
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import EmbedCodeClient from "./EmbedCodeClient";

export default async function EmbedCodePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { business, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <main>
        <p>Business not found.</p>
      </main>
    );
  }

  return <EmbedCodeClient slug={slug} business={business} areas={areas} />;
}
