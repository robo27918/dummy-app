"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">My App</div>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <div className="flex items-center gap-3">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span>{session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Sign in with Google
        </button>
      )}
    </nav>
  );
}
