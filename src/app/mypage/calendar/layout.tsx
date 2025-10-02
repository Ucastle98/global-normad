import React from "react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import SideMenu from "@/components/SideMenu";

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
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
              <header>
                <h1 className="typo-18-b">예약 현황</h1>
                <p className="mt-2 typo-14-m text-gray-500">
                  내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
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