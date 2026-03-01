import Link from "next/link";
import BusinessCard from "@/components/cards/BusinessCard";

export default function PestControlOttawaPage() {
  return (
    <main className="business-profile">
      <Link href="/business" className="back-link">
        ← Back to all businesses
      </Link>

      <BusinessCard
        name="Pest Control Ottawa"
        tagline="Safe. Fast. Affordable."
        description="Licensed and bonded pest control technicians providing fast, safe, and environmentally conscious extermination services across Ottawa."
        services={[
          "Cockroach extermination",
          "Bed bug removal",
          "Ant control",
          "Mice & rat control",
          "Raccoon removal",
          "Squirrel removal & prevention",
          "Bird removal & control",
        ]}
        phone="(613) 209‑1880"
        phoneHref="tel:+16132091880"
        address={{
          street: "116 Albert Street, Suite 300‑15",
          city: "Ottawa",
          region: "ON",
          postal: "K1P 5G3",
        }}
        website="https://www.pestcontrolottawaon.ca"
      />
    </main>
  );
}
