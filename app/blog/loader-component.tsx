"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

function LoaderComponent() {
  const [loading, setLoading] = useState(false);

  return (
    <div onClick={() => setLoading(true)}>
      {loading && (
        <div className="fixed top-0 left-0 opacity-60 bg-white dark:bg-background flex justify-center items-center w-full h-screen">
          {loading && <Loader className="animate-spin w-[28px] h-[28px]" />}
        </div>
      )}
    </div>
  );
}

export default LoaderComponent;
