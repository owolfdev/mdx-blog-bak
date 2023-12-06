"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { set } from "lodash";

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

  const defaultButton = buttonVariants({ variant: "default", size: "default" });

  const handleClick = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 200);

    router.push(url);
  };

  const handleClick2 = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 200);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // router.push(url);
  };

  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      {isButton ? (
        <Link
          href={url}
          onClick={handleClick}
          className={`w-[200px] ${defaultButton}`}
        >
          {children}
        </Link>
      ) : (
        // <div onClick={handleClick} className="w-full">
        //   {children}
        // </div>
        <Link href={url} onClick={handleClick2} className="w-full">
          {children}
        </Link>
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