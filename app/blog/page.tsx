import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import SelectLimitPosts from "./select-limit-posts";
import SearchPosts from "./search-posts";
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
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const searchTerm = searchParams.search || "";

  const defaultButton = buttonVariants({ variant: "default", size: "default" });

  //filter by type, page, limit
  const { posts: blogs, totalPosts } = getPosts(
    "blog",
    postsPerPage,
    currentPage,
    searchTerm
  );

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  //button disabled styles
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  // Utility function to trim description
  function trimDescription(description: string) {
    const wordLimit = 20;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    } else {
      return description;
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-6 ">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">MDX Blog</h1>
      <SearchPosts
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        limit={postsPerPage}
      />

      <div>
        {blogs.length === 0 ? (
          <div className="text-center text-lg flex flex-col justify-center ">
            <span className="pb-[100px] pt-[100px]">
              No blog posts found on this page...
            </span>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {blogs.map((blog: BlogPost) => (
              <li key={blog.slug} className=" border px-3 py-2 rounded-xl">
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="text-2xl font-bold">{blog.title}</h3>
                  <div className="text-sm">{blog.formattedDate}</div>
                  <div title={blog.description}>
                    {trimDescription(blog.description)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {/* pagination */}
        <div
          id="pagination"
          className="flex gap-2 pt-8 pb-2 items-center justify-center"
        >
          {currentPage === 1 ? (
            <span className={`${disabledLinkStyle}`}>{`<<`}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${1}&search=${searchTerm}`}
              >{`<<`}</Link>
            </span>
          )}
          {isPreviousDisabled ? (
            <span className={`${disabledLinkStyle}`}>Previous</span>
          ) : (
            <Link
              className={``}
              href={`/blog?limit=${postsPerPage}&page=${
                currentPage - 1
              }&search=${searchTerm}`}
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
              href={`/blog?limit=${postsPerPage}&page=${
                currentPage + 1
              }&search=${searchTerm}`}
            >
              Next
            </Link>
          )}
          {currentPage === totalPages ? (
            <span className={`${disabledLinkStyle}`}>{`>>`}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${totalPages}&search=${searchTerm}`}
              >{`>>`}</Link>
            </span>
          )}
        </div>
        {/* New component for selecting posts per page */}
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          searchTerm={searchTerm as string}
        />
        {/* pagination end */}
      </div>
    </div>
  );
};

export default Blog;
