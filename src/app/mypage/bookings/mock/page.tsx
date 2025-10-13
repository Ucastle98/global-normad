"use client";

import { useMemo, useState } from "react";
import ListCard from "@/components/ListCard";
import Button from "@/components/Button";
import Image from "next/image";
import logoAuth from "@/assets/img/empty_state.png";
import { mockReservations } from "./mockReservations";

type ReservationFilter = "all" | "pending" | "confirmed" | "canceled" | "completed";

export default function MockBookingsPage() {
  const [filter, setFilter] = useState<ReservationFilter>("all");
  // ✅ mockReservations의 id는 number이므로 number|null로 맞춘다
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const hasReservations = mockReservations.length > 0;

  const availableFilters = useMemo(
    () => Array.from(new Set(mockReservations.map((r) => r.status))) as ReservationFilter[],
    []
  );

  const filtered = useMemo(
    () => (filter === "all" ? mockReservations : mockReservations.filter((r) => r.status === filter)),
    [filter]
  );

  const onCardClick = (id: number) => {
    setOpenCardId((prev) => (prev === id ? null : id)); // 토글
  };

  if (!hasReservations) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-20">
        <Image src={logoAuth} alt="예약 없음" width={122} height={122} className="mb-4" />
        <p className="typo-16-m text-gray-600 mb-[30px]">아직 예약한 체험이 없어요</p>
        <Button label="둘러보기" variant="primary" className="w-[182px] h-[54px]" />
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* 필터 (데이터 있는 상태만) */}
      {availableFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full border ${
              filter === "all" ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            전체
          </button>

          {availableFilters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setOpenCardId(null); // 필터 변경 시 열림 초기화
              }}
              className={`px-4 py-2 rounded-full border ${
                filter === f ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {filterLabel(f)}
            </button>
          ))}
        </div>
      )}

      {/* 예약 카드 + 카드 아래 액션 */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r.id}>
            <div
              className={`cursor-pointer transition-all ${openCardId === r.id ? "ring-2 ring-primary/30 rounded-2xl" : ""}`}
              onClick={() => onCardClick(r.id)}
            >
              <ListCard
                thumbnail={r.activity.bannerImageUrl}
                title={r.activity.title}
                subtitle={`${r.date} · ${r.startTime} - ${r.endTime}`}
                status={r.status}
                price={`₩${r.totalPrice.toLocaleString()}`}
                ctaLabel="자세히"
              />
            </div>

            {/* ✅ 카드 하단 확장 버튼 (애니메이션 없이 안정적으로 렌더) */}
            {openCardId === r.id && (
              <div className="mt-3 mb-4 flex justify-center gap-3">
                {r.status === "confirmed" && (
                  <>
                    <Button
                      label="예약 변경"
                      variant="secondary"
                      className="w-1/3 h-11"
                      onClick={() => {
                        // TODO: 예약 변경 기능 추가 예정
                        console.log("예약 변경 클릭");
                      }}
                    />
                    <Button
                      label="예약 취소"
                      variant="outline"
                      className="w-1/3 h-11"
                      onClick={() => {
                        // TODO: 예약 취소 기능 추가 예정
                        console.log("예약 취소 클릭");
                      }}
                    />
                  </>
                )}

                {r.status === "completed" && (
                  <Button
                    label="후기 작성"
                    variant="primary"
                    className="w-2/3 h-11"
                    onClick={() => {
                      // TODO: 후기 작성 기능 추가 예정
                      console.log("후기 작성 클릭");
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function filterLabel(key: ReservationFilter) {
  switch (key) {
    case "pending":
      return "예약 신청";
    case "confirmed":
      return "예약 완료";
    case "canceled":
      return "예약 취소";
    case "completed":
      return "체험 완료";
    default:
      return "전체";
  }
}
