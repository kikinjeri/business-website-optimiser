// app/card/[slug]/page.tsx
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
import EmbedCard from "@/components/EmbedCard";

export default async function CardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { business, services, areas } = await getBusinessBySlug(params.slug);

  if (!business) {
    return <p>Business not found.</p>;
  }

  return <EmbedCard business={business} services={services} areas={areas} />;
}
