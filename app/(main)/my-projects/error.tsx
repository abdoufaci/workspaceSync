"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-[calc(100vh-81px)] flex-col items-center justify-center">
      <h2 className="text-center">{error.message}</h2>
      <Button
        className="mt-4 bg-primary-blue text-white hover:bg-[#1e78ffdc]"
        onClick={reset}
      >
        Try again
      </Button>
    </main>
  );
}
