// cachePosts.js in the utils folder

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function generatePostsCache() {
  // Define the directory where your MDX posts are stored
  const postsDirectory = path.join(process.cwd(), "data/posts");

  // Read all file names in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  // Process each file and extract front matter
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter } = matter(fileContents);

    // Return an object with the slug and front matter
    return {
      slug,
      ...frontMatter,
    };
  });

  // Define the path for the cache file
  const cachePath = path.join(process.cwd(), "cache/posts.json");

  // Write the posts data to the cache file
  fs.writeFileSync(cachePath, JSON.stringify(posts, null, 2));

  return posts;
}

export function getPosts(type = "", limit, page) {
  const cacheFilePath = path.join(process.cwd(), "cache/posts.json");
  const jsonData = fs.readFileSync(cacheFilePath, "utf8");
  let posts = JSON.parse(jsonData).filter((blog) => !blog.slug.startsWith("."));

  const totalPosts = posts.length;

  posts = posts.filter(
    (post) => !post.slug.startsWith(".") && post.type.includes(type)
  );

  // sort by date

  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  posts.forEach((post) => {
    const date = new Date(post.date);
    post.formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Pagination
  const start = (page - 1) * limit;
  if (limit) {
    posts = posts.slice(start, start + limit);
  }

  return { posts, totalPosts };
}

// Run the function to generate the cache
