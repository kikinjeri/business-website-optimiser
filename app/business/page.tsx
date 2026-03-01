import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function BusinessPage() {
  const supabase = await supabaseServer();

    const { data: businesses, error } = await supabase
      .from("businesses")
      .select("id, name, category, address, phone, website_url, slug")
      .order("name");

  if (error) {
    console.error(error);
    return <p>Error loading businesses.</p>;
  }

  return (
    <main className="business-list">
      <h1 className="page-title">Business</h1>

      {businesses?.map((biz) => (
        <article key={biz.id} className={`business-row accent-${biz.category}`}>
          <div className="business-row__identity">
            <h2 className="business-row__name">{biz.name}</h2>
            <p className="business-row__category">{biz.category}</p>
          </div>

          <div className="business-row__details">
            <span className="detail-item">{biz.address}</span>
            <span className="detail-item">{biz.telephone}</span>
            {biz.website && (
              <a
                href={biz.website}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link"
              >
                {biz.website.replace("https://", "").replace("http://", "")}
              </a>
            )}
          </div>

          <div className="business-row__actions">
            <Link href={`/business/${biz.slug}`} className="action-link">
              View Profile
            </Link>
            <Link href={`/card/${biz.slug}`} className="action-link subtle">
              View Card
            </Link>
          </div>
        </article>
      ))}
    </main>
  );
}
