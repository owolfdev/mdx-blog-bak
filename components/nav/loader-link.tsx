"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoaderLink({
  url,
  children,
  isButton = false,
}: {
  url: string;
  children: React.ReactNode;
  isButton?: boolean;
}) {
  //
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 200);
    router.push(url);
  };

  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      {isButton ? (
        <Button onClick={handleClick} className="w-[200px]">
          {children}
        </Button>
      ) : (
        <div onClick={handleClick} className="w-full">
          {children}
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 opacity-60 bg-white dark:bg-black flex justify-center items-center w-full h-screen">
          <Loader className="animate-spin w-[28px] h-[28px]" />
        </div>
      )}
    </div>
  );
}

export default LoaderLink;
