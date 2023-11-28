import Link from "next/link";

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background p-6">
      <div className="sm:px-8 px-4 flex flex-col justify-between items-center h-16 space-y-4 sm:space-y-0">
        <div className="flex gap-6 items-center">
          <div className="">&copy; {new Date().getFullYear()} MDX Blog</div>
        </div>
        <nav className="flex gap-6 items-center text-sm">
          <a href="/">Home</a>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
