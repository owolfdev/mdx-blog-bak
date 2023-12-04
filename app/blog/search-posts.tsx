"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { useEffect } from "react";
import path from "path";

const SearchPosts = ({
  postsPerPage,
  currentPage,
  limit,
}: {
  postsPerPage: number;
  currentPage: number;
  limit: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  // Clear the input when the current path is /blog
  // useEffect(() => {
  //   if (pathname +  searchParams === "/blog") {
  //     setInputValue("");
  //   }
  // }, [pathname]);

  const updateSearch = useCallback(
    debounce((searchTerm: string) => {
      router.push(`/blog?limit=${limit}&page=${1}&search=${searchTerm}`);
    }, 500),
    []
  );

  const handleChange = (event: any) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    updateSearch(searchTerm);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex gap-2 items-center">
        <div className="icon-container">
          <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
        </div>
        <div className="w-2/3">
          <Input
            type="text"
            name="searchTerm"
            placeholder="enter search term"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchPosts;
