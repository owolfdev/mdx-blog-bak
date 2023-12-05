"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

function SortPosts() {
  // State to track sort order
  const [sortOrder, setSortOrder] = useState("asc");

  // Handler to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="w-1/2 sm:w-1/3 flex gap-2 items-center">
      {sortOrder === "asc" ? (
        <ChevronDown className="cursor-pointer" onClick={toggleSortOrder} />
      ) : (
        <ChevronUp className="cursor-pointer" onClick={toggleSortOrder} />
      )}
      <div className="text-slate-400 w-full">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">
              <span className="sm:text-sm text-lg">Date</span>
            </SelectItem>
            <SelectItem value="title">
              <span className="sm:text-sm text-lg">Title</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SortPosts;
