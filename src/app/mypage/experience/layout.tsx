import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import SideMenu from "@/components/SideMenu";

export default function ExperienceLayout() {
  return (
    <div>
      {/* TODO: 공용 레이아웃 적용 후 GNB 제거 예정 */}
      <GNB isLoggedIn unread={3} />

      <main className="min-h-screen bg-bg-default text-text-primary">
        <div className="mx-auto max-w-[1200px] p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[178px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)] gap-6 lg:gap-10">
            {/* LEFT */}
            {/* 모바일 상태에서는 hidden, md 이상부터는 block */}
            <aside className="hidden md:block space-y-6">
              <SideMenu />
            </aside>

            {/* RIGHT */}
            <div className="space-y-8">
              {/* 헤더 */}
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="typo-18-b">내 체험 관리</h1>
                  <p className="mt-2 typo-14-m text-gray-500">
                    체험을 등록하거나 수정 및 삭제가 가능합니다.
                  </p>
                </div>
                <Link href="/mypage/experience/register">
                  <Button label="체험 등록하기" variant="primary" />
                </Link>
              </header>

              {/* 카드 리스트 자리 */}
              <section>{/* TODO: 카드 리스트 */}</section>
            </div>
          </div>
        </div>
      </main>

      {/* TODO: 공용 레이아웃 적용 후 Footer 제거 예정 */}
      <Footer />
    </div>
  );
}
