// src/lib/quanta.ts

// NOTE: Ensure this URL matches your actual deployed CMS URL
const API_URL = 'https://quantapress.vercel.app/api/v1'; 
const API_KEY = process.env.NEXT_PUBLIC_QUANTA_API_KEY;

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // JSON from Tiptap
  published_at: string;
  featured_image?: {
    file_url: string;
    alt_text_default?: string;
  };
  categories?: {
    name: string;
    slug: string;
  }[];
}

export async function getLatestPosts(limit = 6): Promise<Article[]> {
  if (!API_KEY) {
    console.error("Quanta API Key missing!");
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/posts?key=${API_KEY}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);

    const json = await res.json();
    return json.data ? json.data.slice(0, limit) : [];
  } catch (error) {
    console.error("Error fetching Quanta posts:", error);
    return [];
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<Article[]> {
  if (!API_KEY) return [];
  
  // Note: This assumes the CMS supports ?category_slug= query. 
  // If not, we might need to fetch all and filter client-side (not efficient but safe fallback).
  try {
    const res = await fetch(`${API_URL}/posts?key=${API_KEY}&category_slug=${categorySlug}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return [];
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  if (!API_KEY) return null;

  try {
    // FIX: Encode the slug to handle spaces and special characters safely
    // e.g. "my post title" becomes "my%20post%20title"
    const encodedSlug = encodeURIComponent(slug);

    const res = await fetch(`${API_URL}/posts?key=${API_KEY}&slug=${encodedSlug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`API Error ${res.status} fetching slug: ${slug}`);
      return null;
    }

    const json = await res.json();
    
    // Return the data directly (assuming API returns { data: Article })
    // If the API returns { data: [Article] } for a search, we grab the first one.
    return Array.isArray(json.data) ? json.data[0] : json.data || null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}