import React from "react";

/**
 * ✅ 목(Mock) 데이터 테스트용 경량 레이아웃
 * - GNB / Footer / SideMenu 제외
 * - 중앙 정렬 + 깔끔한 여백만 유지
 * - 실제 마이페이지 레이아웃과 겹치지 않음
 */
export default function MockLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-start justify-center bg-bg-default text-text-primary p-6 sm:p-8">
      <div className="w-full max-w-[720px]">
        {children}
      </div>
    </main>
  );
}
