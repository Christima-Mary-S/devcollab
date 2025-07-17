"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function RoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams()! as { id: string };

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
      <h1 className="title">Room: {id}</h1>
      {/* TODO: embed Editor */}
    </div>
  );
}
