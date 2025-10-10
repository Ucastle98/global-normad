"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ListCard from "@/components/ListCard";
import Button from "@/components/Button";
import Image from "next/image";
import logoAuth from "@/assets/img/empty_state.png";
import api from "@/utils/api";
import { MyReservationsResponse, Reservation } from "@/types/reservation";

type ReservationFilter = "all" | "pending" | "confirmed" | "canceled" | "completed";

export default function BookingsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReservationFilter>("all");
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  // ✅ Hook 순서는 항상 일정해야 함
  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await api.get<MyReservationsResponse>("/my-reservations");
        setReservations(res.reservations);
      } catch (err) {
        console.error("예약 리스트 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  // ✅ useMemo는 절대 조건문 안에 넣지 않음
  const filtered = useMemo(
    () => reservations.filter((r) => (filter === "all" ? true : r.status === filter)),
    [reservations, filter]
  );

  const availableFilters = useMemo(
    () =>
      Array.from(new Set(reservations.map((r) => r.status))) as ReservationFilter[],
    [reservations]
  );

  if (loading) {
    // Hook 이후 return 해야 함 (조건부 Hook 금지)
    return <p>로딩 중...</p>;
  }

  const hasReservations = reservations.length > 0;

  return hasReservations ? (
    <div className="space-y-6">
      {/* ✅ 필터 */}
      {availableFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full border ${
              filter === "all"
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            전체
          </button>

          {availableFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border ${
                filter === f
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {filterLabel(f)}
            </button>
          ))}
        </div>
      )}

      {/* ✅ 예약 카드 리스트 */}
      {filtered.map((r) => (
        <div key={r.id}>
          <div
            className={`cursor-pointer transition-all ${
              openCardId === r.id ? "ring-2 ring-primary/30 rounded-2xl" : ""
            }`}
            onClick={() => setOpenCardId((prev) => (prev === r.id ? null : r.id))}
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

          {/* ✅ 카드 아래 버튼 */}
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
  ) : (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <Image src={logoAuth} alt="예약 없음" width={122} height={122} className="mb-4" />
      <p className="typo-16-m text-gray-600 mb-[30px]">아직 예약한 체험이 없어요</p>
      <Link href="/activities">
        <Button label="둘러보기" variant="primary" className="w-[182px] h-[54px]" />
      </Link>
    </section>
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
