"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BlogLink() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      <Button onClick={() => setLoading(true)} className="w-[200px]">
        <Link href="/blog">Start Reading</Link>
      </Button>
      <div>{loading && <Loader className="animate-spin" />}</div>
    </div>
  );
}

export default BlogLink;
