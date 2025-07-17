"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        DevCollab
      </Link>

      {status === "loading" ? (
        <span>Loading…</span>
      ) : session?.user ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-indigo-500">
            Hello, {session.user.name ?? session.user.email}
          </span>
          <button onClick={() => signOut()} className="btn btn-outline text-sm">
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="btn btn-primary text-sm"
        >
          Sign in
        </button>
      )}
    </nav>
  );
}
