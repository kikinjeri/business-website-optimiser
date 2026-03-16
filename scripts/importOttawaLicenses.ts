// scripts/importOttawaLicenses.ts
import "dotenv/config";


import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role
);

// Official Ottawa dataset (CSV → JSON)
const DATA_URL =
  "https://opendata.arcgis.com/datasets/ottawa::business-licences.geojson";

function makeSlug(name: string) {
  return slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });
}

async function run() {
  console.log("Fetching Ottawa Licensed Business Registry…");

  const res = await fetch(DATA_URL);
  const json = await res.json();

  if (!json.features) {
    console.error("Invalid dataset format.");
    return;
  }

  console.log(`Fetched ${json.features.length} records.`);

  for (const feature of json.features) {
    const p = feature.properties;

    const name = p["Business Name"]?.trim();
    if (!name) continue;

    const slug = makeSlug(name);

    const address = p["Address"]?.trim() || null;
    const category = p["Category"]?.trim() || null;
    const license_type = p["License Type"]?.trim() || null;
    const neighbourhood = p["Neighbourhood"]?.trim() || null;

    const longitude = feature.geometry?.coordinates?.[0] ?? null;
    const latitude = feature.geometry?.coordinates?.[1] ?? null;

    // Insert or update
    const { error } = await supabase
      .from("businesses")
      .upsert(
        {
          slug,
          name,
          address,
          category,
          license_type,
          neighborhood: neighbourhood,
          latitude,
          longitude,
          // You are replacing services → tags
          tags: category ? [category] : [],
        },
        { onConflict: "slug" }
      );

    if (error) {
      console.error("Error inserting:", name, error);
    } else {
      console.log("Imported:", name);
    }
  }

  console.log("Done.");
}

run();
