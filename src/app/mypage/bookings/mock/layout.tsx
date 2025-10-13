import React from "react";

export default function MockBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-bg-default text-text-primary flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-[800px] space-y-8">

        {children}
      </div>
    </main>
  );
}
