import BusinessCard from "@/components/cards/BusinessCard";
<<<<<<< HEAD
import { getBusinessBySlug } from "@/lib/getBusinessBySlug";
=======
import Link from "next/link";
>>>>>>> embed-code

export default async function BusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
}) {
<<<<<<< HEAD
  const { slug } = await params;
  const sp = await searchParams;
=======
  const { slug } = await props.params;
>>>>>>> embed-code

  const { business, services, areas } = await getBusinessBySlug(slug);

  if (!business) {
    return (
<<<<<<< HEAD
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "20px",
          color: "#fff",
          background: "#0f172a",
        }}
      >
        Business not found.
=======
      <div className="business-page">
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
>>>>>>> embed-code
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div style={{ padding: "40px" }}>
      <BusinessCard
        business={business}
        services={services}
        areas={areas}
        searchParams={sp ?? {}}
      />
=======
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
>>>>>>> embed-code
    </div>
  );
}
