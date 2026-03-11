import BusinessCard from "@/components/cards/BusinessCard";
import Link from "next/link";
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";

export default async function BusinessPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
      <div className="business-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </div>
    );
  }

  return (
    <div className="business-page">
      <div className="business-page__topbar">
        <Link
          href={`/business/${slug}/embed-code`}
          className="business-page__embed-btn"
        >
          Get embed code →
        </Link>
      </div>

      <div className="business-page__card-wrapper">
        <BusinessCard business={business} services={services} areas={areas} />
      </div>
    </div>
  );
}
