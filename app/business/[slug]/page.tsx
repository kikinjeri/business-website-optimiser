import { supabaseServer } from "@/lib/supabase/server";
import BusinessCard from "@/components/BusinessCard";

export default async function BusinessPage({ params }) {
  const { slug } = await params;

  const supabase = await supabaseServer();

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Business not found</h1>
        <p>No business exists with the slug: {slug}</p>
      </main>
    );
  }

  const { data: servicesRaw } = await supabase
    .from("services")
    .select("id, name_en, description_en, starting_price")
    .eq("business_id", business.id);

  const services = servicesRaw ?? [];

  const { data: areasRaw } = await supabase
    .from("service_areas")
    .select("id, area_name")
    .eq("business_id", business.id);

  const areas = areasRaw ?? [];

  const neighborhood = business.address
    ?.split(",")[1]
    ?.trim()
    ?.replace("Ottawa", "")
    ?.trim();

  return (
    <main className="business-page">
      <div className="container">
        <header className="business-header">
          <h1>{business.name}</h1>
          {business.tagline_en && (
            <p className="tagline">{business.tagline_en}</p>
          )}
        </header>

        {business.website_url && (
          <a
            href={business.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-link"
          >
            Visit Website →
          </a>
        )}

        <section className="business-card-section">
          <BusinessCard
            name={business.name}
            tagline={business.tagline_en}
            phone={business.phone}
            address={business.address}
            services={services.map((s) => s.name_en)}
            slug={business.slug} // ← FIXED (no JSX comment)
          />
        </section>

        {business.map_url && (
          <section className="map-section">
            <h2>Location</h2>
            <iframe
              src={business.map_url}
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "8px" }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </section>
        )}

        {neighborhood && (
          <section className="menu-section">
            <h2>Neighbourhood</h2>
            <p>{neighborhood}</p>
          </section>
        )}

        {services.length > 0 && (
          <section className="menu-section">
            <h2>Services</h2>
            <ul className="menu-list">
              {services.map((service) => (
                <li key={service.id} className="menu-item">
                  <div className="menu-item-header">
                    <strong>{service.name_en}</strong>
                    {service.starting_price && (
                      <span className="price">${service.starting_price}</span>
                    )}
                  </div>

                  {service.description_en && (
                    <p className="description">{service.description_en}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {areas.length > 0 && (
          <section className="menu-section">
            <h2>Service Areas</h2>
            <ul className="area-list">
              {areas.map((area) => (
                <li key={area.id}>{area.area_name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
