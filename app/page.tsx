import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Welcome to MDX Blog
      </h1>
      <p className="text-center">
        This is a simple blog built with Next.js and MDX.
      </p>
      <Button className="w-[200px]">
        <Link href="/blog">Start Reading</Link>
      </Button>
    </div>
  );
}
