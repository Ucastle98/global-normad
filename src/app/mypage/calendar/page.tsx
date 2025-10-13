"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import emptyState from "@/assets/img/empty_state.png";
import api from "@/utils/api";
import CalendarBoard from "@/app/mypage/calendar/components/calendarBoard/CalendarBoard"; // ✅ 공용 달력 컴포넌트 import

/** 내 체험 요약 타입 */
type MyActivity = {
  id: number;
  title: string;
};

/** 월별 예약 현황 타입 */
type ReservationDashboard = {
  date: string; // YYYY-MM-DD
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

export default function CalendarPage() {
  const [activities, setActivities] = useState<MyActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [dashboard, setDashboard] = useState<ReservationDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  /** ✅ 체험 목록 조회 */
  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await api.get<MyActivity[]>("/my-activities");
        setActivities(res);
        if (res.length > 0 && !selectedActivity) {
          setSelectedActivity(res[0].id);
        }
      } catch (err) {
        console.error("체험 리스트 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** ✅ 선택된 체험의 월별 예약 현황 조회 */
  useEffect(() => {
    async function fetchDashboard() {
      if (!selectedActivity) return;
      try {
        const year = activeDate.getFullYear();
        const month = activeDate.getMonth() + 1;
        const res = await api.get<ReservationDashboard[]>(
          `/my-activities/${selectedActivity}/reservation-dashboard?year=${year}&month=${month}`
        );
        setDashboard(res);
      } catch (err) {
        console.error("예약 현황 조회 실패:", err);
      }
    }
    fetchDashboard();
  }, [selectedActivity, activeDate]);

  /** ✅ 로딩 상태 */
  if (loading) {
    return <p className="typo-14-m text-gray-600">로딩 중...</p>;
  }

  /** ✅ 체험이 하나도 없을 때 */
  if (activities.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-20">
        <Image
          src={emptyState}
          alt="체험 없음"
          width={122}
          height={122}
          className="mb-4"
        />
        <p className="typo-16-m text-gray-600 mb-[30px]">
          아직 등록한 체험이 없어요
        </p>
        <Link href="/mypage/experience/register">
          <Button
            label="체험 등록하기"
            variant="primary"
            className="w-[182px] h-[54px]"
          />
        </Link>
      </section>
    );
  }

  /** ✅ UI 렌더링 */
  return (
    <div className="space-y-6">
      {/* 체험 선택 */}
      <select
        className="w-full rounded-2xl border border-border-default px-4 py-3 typo-14-m text-text-primary"
        value={selectedActivity ?? ""}
        onChange={(e) => setSelectedActivity(Number(e.target.value))}
      >
        {activities.map((a) => (
          <option key={a.id} value={a.id}>
            {a.title}
          </option>
        ))}
      </select>

      {/* ✅ 공용 CalendarBoard 컴포넌트 사용 */}
      {selectedActivity && (
        <CalendarBoard
          data={dashboard}
          onMonthChange={(date) => setActiveDate(date)}
          onDateClick={(date) => {
            console.log("날짜 클릭:", date);
            // TODO: 이후 모달 연결 시 여기서 openModal(date) 호출
          }}
        />
      )}
    </div>
  );
}
