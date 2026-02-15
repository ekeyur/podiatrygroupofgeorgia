import type { Testimonial } from "@/types/wordpress";

// Google Places API (New) v1 response types
interface GooglePlaceReview {
  name: string;
  relativePublishTimeDescription: string;
  text: { text: string; languageCode: string };
  originalText?: { text: string; languageCode: string };
  rating: number;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
  googleMapsUri?: string;
}

interface GooglePlaceDetailsResponse {
  reviews?: GooglePlaceReview[];
}

const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";

/**
 * Fetch reviews from the Google Places API (v1) and return only
 * 5-star reviews, sorted newest-first.
 *
 * The API returns at most 5 "most relevant" reviews per request.
 * We filter to rating === 5 and sort by publishTime descending.
 *
 * Results are cached via Next.js `fetch` for 24 hours (revalidate: 86400).
 */
export async function getGoogleReviews(): Promise<Testimonial[]> {
  if (!PLACE_ID || !API_KEY) {
    console.warn(
      "[google-reviews] Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY env vars"
    );
    return [];
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "reviews",
      },
      next: { revalidate: 86400, tags: ["google-reviews"] },
    });

    if (!res.ok) {
      console.error(
        `[google-reviews] API returned ${res.status}: ${await res.text()}`
      );
      return [];
    }

    const data: GooglePlaceDetailsResponse = await res.json();
    const reviews = data.reviews ?? [];

    return reviews
      .filter((r) => r.rating === 5)
      .sort(
        (a, b) =>
          new Date(b.publishTime).getTime() -
          new Date(a.publishTime).getTime()
      )
      .map((r) => ({
        content: r.originalText?.text || r.text.text,
        acf: {
          patientName: r.authorAttribution.displayName,
          rating: r.rating,
          source: "Google",
          dateReceived: r.publishTime,
          relativeTime: r.relativePublishTimeDescription,
          photoUrl: r.authorAttribution.photoUri,
          googleMapsUri: r.googleMapsUri,
        },
      }));
  } catch (err) {
    console.error("[google-reviews] Failed to fetch:", err);
    return [];
  }
}
