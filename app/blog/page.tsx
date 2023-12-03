import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

import { getPosts } from "@/lib/posts.mjs";

interface BlogPost {
  slug: string;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  formattedDate?: string; // Optional, as it will be added later
}

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const postsPerPage =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

  const defaultButton = buttonVariants({ variant: "default", size: "default" });

  //filter by type, page, limit
  const { posts: blogs, totalPosts } = getPosts(
    "blog",
    postsPerPage,
    currentPage
  );
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {blogs.map((blog: BlogPost) => (
          <li key={blog.slug} className=" border px-3 py-2 rounded-xl">
            <Link href={`/blog/${blog.slug}`}>
              <h3 className="text-2xl font-bold">{blog.title}</h3>
              <div className="text-sm">{blog.formattedDate}</div>
              <div>{blog.description}</div>
            </Link>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="flex gap-2 py-6 items-center">
        <Button size={"sm"} disabled={currentPage <= 1}>
          <Link
            className="h-full w-full flex items-center flex-grow"
            href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}`}
          >
            Previous
          </Link>
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <Button
          className="flex"
          size={"sm"}
          disabled={currentPage >= totalPages}
        >
          {" "}
          <Link
            className=" h-full w-full flex items-center flex-grow"
            href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}`}
          >
            <div className="w-full">Next</div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Blog;
