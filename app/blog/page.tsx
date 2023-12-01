import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const blogDirectory = path.join(process.cwd(), "../mdx-blog/data/posts");
  const fileNames = fs.readdirSync(blogDirectory);

  const blogs = fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data: frontMatter } = matter(fileContents);

    const date = new Date(frontMatter.date);

    // Format the date to a readable string format
    // For example, "October 1, 2021"
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      slug,
      formattedDate,
      meta: frontMatter,
    };
  });

  return (
    <div className="">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Next.js MDX Blog
        </h1>
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Blog Posts</h2>
          <ul className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <li key={blog.slug} className="border px-3 py-2 rounded-xl">
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="font-bold text-xl">{blog.meta.title}</h3>
                  <div>{blog.formattedDate}</div>
                  <div>{blog.meta.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}