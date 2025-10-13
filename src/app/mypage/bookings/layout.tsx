import React from "react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import SideMenu from "@/components/SideMenu";

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GNB isLoggedIn unread={3} />

      <main className="min-h-screen bg-bg-default text-text-primary">
        <div className="mx-auto max-w-[1200px] p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[178px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 lg:gap-10">
            {/* LEFT */}
            <aside className="hidden md:block space-y-6">
              <SideMenu />
            </aside>

            {/* RIGHT */}
            <div className="space-y-8">
              {/* 헤더 */}
              <header className="flex flex-col gap-2">
                <h1 className="typo-18-b">예약 내역</h1>
                <p className="typo-14-m text-gray-500">
                  예약내역 변경 및 취소할 수 있습니다.
                </p>
              </header>

              {/* 페이지 콘텐츠 */}
              <section>{children}</section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
