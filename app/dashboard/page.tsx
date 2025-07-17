"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading session…</p>;
  }

  return (
    <div>
      <h1 className="title">Your Rooms</h1>
      {/* TODO: list rooms */}
    </div>
  );
}
