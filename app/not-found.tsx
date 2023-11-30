import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-6">
        <h2 className="font-bold text-lg">Not Found</h2>
        <p>Could not find requested resource</p>
        <a href="/">Return Home</a>
      </div>
    </main>
  );
}
