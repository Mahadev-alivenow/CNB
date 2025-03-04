"use server"
const baseUrl = process.env.WORDPRESS_URL;

import { DrugPost } from '@/types/drugPost';
// export async function getPosts(perPage = 5, page = 1) {

//     const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?perPage=${perPage}&page=${page}`);
//     const posts = await response.json()
//     return posts
    
// }

// actions/wp.action.ts
import axios from 'axios';

// Fetch all post IDs
export async function getAllPostIds() {
  try {
    const response = await axios.get(`${baseUrl}/wp-json/wp/v2/posts`);
    return response.data.map((post: { id: number }) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching post IDs:', error);
    return [];
  }
}

// Fetch a single post by ID
export async function getPost(id: string) {
  try {
    const response = await axios.get(`${baseUrl}/wp-json/wp/v2/posts/${id}`);
    const post = response.data;
    return {
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      images: post.featured_media_urls || [], // Adjust based on your API response
    };
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
}


export const getPosts = async () => {
  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featured_media_url:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      categories: post._embedded?.["wp:term"]?.[0]?.[0]?.name || null,
    }));

    return formattedPosts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

// lib/wordpress.js
export async function fetchPostsByC() {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export async function fetchPostById(id: string) {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts/${id}?_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  return res.json();
}


export async function fetchCategoryIds(desiredCategories) {
  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const categories = await response.json();

    // Filter categories to get the IDs of the desired ones
    const categoryIds = categories
      .filter((category) => desiredCategories.includes(category.name))
      .map((category) => category.id);

    return categoryIds;
  } catch (error) {
    console.error('Error fetching category IDs:', error);
    return [];
  }
}

export async function fetchPostsByCategories(desiredCategories) {
  try {
    const categoryIds = await fetchCategoryIds(desiredCategories);

    if (categoryIds.length === 0) {
      console.warn('No matching categories found.');
      return []; // No matching categories found
    }

    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryIds.join(',')}&_embed`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}




export async function fetchDrugPosts(): Promise<DrugPost[]> {
  // Update this to match your WordPress installation
  const endpoint = `${baseUrl}/wp-json/wp/v2/posts?_embed`

  console.log("Fetching posts from:", endpoint)

  try {
    const response = await fetch(endpoint, { next: { revalidate: 3600 } })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const posts = await response.json()

    // console.log("Fetched posts:", posts)

    if (!Array.isArray(posts)) {
      throw new Error("Unexpected response format")
    }

    return posts.map((post: any) => ({
      id: post.id,
      title: post.title?.rendered || "Untitled",
      excerpt: post.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "").trim() || "No excerpt available",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
    }))
  } catch (error) {
    console.error("Error fetching drug posts:", error)
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return []
  }
}

// --------- search artcile ---------


// Make sure getPosts includes _embed=true parameter
export async function getAllPosts() {
  try {
    // Make sure we're including _embed=true in the API request
    const response = await fetch(`${baseUrl}/wp/v2/posts?_embed=true&per_page=100`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    const posts = await response.json()

    // Debug the first post to check if _embedded data is present
    if (posts.length > 0) {
      console.log(
        `First post _embedded data:`,
        posts[0]._embedded ? "Present" : "Missing",
        posts[0]._embedded?.["wp:featuredmedia"] ? "Featured media present" : "No featured media",
      )
    }

    return posts
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function directSearch(query: string) {
  try {
    // Use the original getPosts function
    const posts = await getPosts()

    console.log(`Fetched ${posts.length} posts for searching`)
    console.log(`First post structure:`, posts.length > 0 ? Object.keys(posts[0]).join(", ") : "No posts")

    // If first post has featured_media_url, log it
    if (posts.length > 0 && posts[0].featured_media_url) {
      console.log(`First post featured_media_url:`, posts[0].featured_media_url)
    }

    // If no query, return all posts
    if (!query || !query.trim()) {
      return posts
    }

    // Normalize the search query - split into words for better matching
    const searchTerms = query.toLowerCase().trim().split(/\s+/)
    console.log(`Search terms: ${JSON.stringify(searchTerms)}`)

    // Filter posts by checking if ANY search term appears in title, content, or excerpt
    const filteredPosts = posts.filter((post) => {
      // Get text content and normalize it - handle both formatted and raw structures
      const title = post.title?.rendered ? normalizeText(post.title.rendered) : ""

      const content = post.content?.rendered ? normalizeText(post.content.rendered) : ""

      const excerpt = post.excerpt?.rendered ? normalizeText(post.excerpt.rendered) : ""

      // For debugging
      console.log(`Post ID ${post.id} - Title: ${title.substring(0, 30)}...`)

      // Check if ANY search term appears in ANY field
      const matches = searchTerms.some((term) => {
        const titleMatch = title.includes(term)
        const contentMatch = content.includes(term)
        const excerptMatch = excerpt.includes(term)

        // Log matches for debugging
        if (titleMatch || contentMatch || excerptMatch) {
          console.log(`Match found for "${term}" in post ID ${post.id}`)
          if (titleMatch)
            console.log(
              `- Title match: "${title.substring(
                Math.max(0, title.indexOf(term) - 10),
                Math.min(title.length, title.indexOf(term) + term.length + 10),
              )}"`,
            )
          if (contentMatch) console.log(`- Content match`)
          if (excerptMatch) console.log(`- Excerpt match`)
        }

        return titleMatch || contentMatch || excerptMatch
      })

      return matches
    })

    console.log(`Found ${filteredPosts.length} posts matching "${query}"`)
    return filteredPosts
  } catch (error) {
    console.error("Error in direct search:", error)
    return []
  }
}

// Helper function to normalize text for searching
function normalizeText(html: string): string {
  // Remove HTML tags
  const textOnly = html.replace(/<\/?[^>]+(>|$)/g, " ")

  // Decode HTML entities
  const decoded = textOnly
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")

  // Normalize whitespace and convert to lowercase
  return decoded.toLowerCase().replace(/\s+/g, " ").trim()
}

