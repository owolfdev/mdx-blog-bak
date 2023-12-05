"use client";
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    setTimeout(() => {
      if (loading) setShowLoader(true);
    }, 1000); // 1000 milliseconds delay
    await router.push(url);
  };

  useEffect(() => {
    if (!loading) {
      setShowLoader(false);
    }
  }, [loading]);

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

      {showLoader && (
        <div className="absolute bg-black opacity-60 w-full h-full flex justify-center items-center">
          <Loader className="animate-spin w-[28px] h-[28px]" />
        </div>
      )}
    </div>
  );
}

export default LoaderLink;
