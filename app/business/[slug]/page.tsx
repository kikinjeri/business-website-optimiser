import { supabaseServer } from "@/lib/supabase/server";

export default async function BusinessPage({ params }) {
  const { slug } = await params; // <-- FIX

  console.log("Slug received by BusinessPage:", slug);

  const supabase = await supabaseServer();

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!business) {
    return <p>No business found.</p>;
  }

  return (
    <div>
      <h1>{business.name}</h1>
      {/* your card component here */}
    </div>
  );
}
