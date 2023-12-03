"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function CachePostsButton() {
  const handleCachePosts = async () => {
    const response = await fetch("/api/cache-posts", { method: "POST" });

    if (!response.ok) {
      console.error("Server responded with an error:", response.status);
      return;
    }

    try {
      const data = await response.json();
      console.log(data); // Or handle this message as needed
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return <Button onClick={handleCachePosts}>Cache Posts</Button>;
}

export default CachePostsButton;
