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

  //button disabled styles
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

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

      <div className="flex gap-2 py-6 items-center px-2">
        {currentPage === 1 ? (
          <span className={`${disabledLinkStyle}`}>{`<<`}</span>
        ) : (
          <span>
            <Link href={`/blog?limit=${postsPerPage}&page=${1}`}>{`<<`}</Link>
          </span>
        )}
        {isPreviousDisabled ? (
          <span className={`${disabledLinkStyle}`}>Previous</span>
        ) : (
          <Link
            className={``}
            href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}`}
          >
            Previous
          </Link>
        )}

        <span>- {`Page ${currentPage} of ${totalPages}`} -</span>

        {isNextDisabled ? (
          <span className={`${disabledLinkStyle}`}>Next</span>
        ) : (
          <Link
            className={``}
            href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}`}
          >
            Next
          </Link>
        )}
        {currentPage === totalPages ? (
          <span className={`${disabledLinkStyle}`}>{`>>`}</span>
        ) : (
          <span>
            <Link
              href={`/blog?limit=${postsPerPage}&page=${totalPages}`}
            >{`>>`}</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Blog;
