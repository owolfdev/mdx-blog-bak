"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SelectLimitPosts({
  postsPerPage,
  currentPage,
  searchTerm,
}: {
  postsPerPage: number;
  currentPage: number;
  searchTerm: string;
}) {
  const [localPostsPerPage, setLocalPostsPerPage] = useState(postsPerPage);

  const router = useRouter();

  // Function to handle selection change
  const handlePostsPerPageChange = (newLimit: number) => {
    setLocalPostsPerPage(newLimit);
    //setLimit(newLimit); // Update the URL parameter, if applicable
    // You might need to fetch posts again here or it could be handled by a useEffect
    router.push(`/blog?limit=${newLimit}&page=${1}&search=${searchTerm}`);
  };

  return (
    <div>
      <div className="text-center">
        <label htmlFor="postsPerPage">Posts per page:</label>
        <select
          id="postsPerPage"
          value={localPostsPerPage}
          onChange={(e) => handlePostsPerPageChange(Number(e.target.value))}
          className="mx-2 rounded-md border border-gray-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}

export default SelectLimitPosts;
