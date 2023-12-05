"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const SearchPosts = ({
  currentPage,
  limit,
  numBlogs,
  sort,
}: {
  currentPage: number;
  limit: number;
  numBlogs: number;
  sort: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  let search = searchParams.get("search");

  useEffect(() => {
    // Focus the input whenever inputValue changes
    if (inputRef.current && search) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  useEffect(() => {
    if (search === null) {
      search = "";
    }
    const searchFromUrl = search as string;
    if (searchFromUrl !== inputValue) {
      setInputValue(searchFromUrl);
    }
  }, [searchParams]);

  const updateSearch = useCallback(
    debounce((searchTerm: string) => {
      if (numBlogs === 0) {
        router.push(
          `/blog?limit=${limit}&page=${1}${
            searchTerm ? `&search=${searchTerm}` : ""
          }${sort !== "date_desc" ? `&sort=${sort}` : ""}`
        );
      } else {
        router.push(
          `/blog?limit=${limit}&page=${currentPage}${
            searchTerm ? `&search=${searchTerm}` : ""
          }${sort !== "date_desc" ? `&sort=${sort}` : ""}`
        );
      }
    }, 500),
    []
  );

  const handleChange = (event: any) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    updateSearch(searchTerm);
  };

  return (
    <div className="flex gap-2 items-center w-1/2 sm:w-2/3 ">
      <div className="icon-container">
        <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
      </div>
      <div className="w-full">
        {/* <div>{sort}</div> */}
        <Input
          ref={inputRef}
          type="text"
          name="searchTerm"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
          className="text-lg sm:text-sm"
        />
      </div>
    </div>
  );
};

export default SearchPosts;
