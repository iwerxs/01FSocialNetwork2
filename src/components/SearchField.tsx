//src/components/SearchField.tsx
"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // search logic
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  //html form, react hook form not required
  //Progressive Enhancement, works without JS
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        {/* q for query */}
        <Input name="q" placeholder="Search..." className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </form>
  );
}
