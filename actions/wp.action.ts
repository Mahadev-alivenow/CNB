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

