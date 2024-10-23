//src/app/(main)/Navbar.tsx
//Navbar for the Front Page

import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-8 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Social Network
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
