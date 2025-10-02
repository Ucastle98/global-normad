"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import emptyState from "@/assets/img/empty_state.png";
import api from "@/api/axios"; // ✅ axios 인스턴스 사용

/** 내 체험 요약 */
type MyActivity = { id: number; title: string };

/** 월별 예약 현황 */
type ReservationDashboard = {
  date: string; // YYYY-MM-DD
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

/** YYYY-MM-DD (로컬 기준) */
function toYMD(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarPage() {
  const [activities, setActivities] = useState<MyActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [dashboard, setDashboard] = useState<ReservationDashboard[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 현재 달(캘린더가 보여주는 달)
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  // ✅ 내 체험 리스트 조회
  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await api.get<MyActivity[]>("/my-activities");
        setActivities(res.data);                 // ✅ axios는 .data
        if (res.data.length > 0 && !selectedActivity) {
          setSelectedActivity(res.data[0].id);   // 첫 항목 자동 선택
        }
      } catch (err) {
        console.error("체험 리스트 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ 선택한 체험의 월별 예약 현황 조회
  useEffect(() => {
    async function fetchDashboard() {
      if (!selectedActivity) return;
      try {
        const year = activeDate.getFullYear();
        const month = activeDate.getMonth() + 1;
        const res = await api.get<ReservationDashboard[]>(
          `/my-activities/${selectedActivity}/reservation-dashboard?year=${year}&month=${month}`,
        );
        setDashboard(res.data); // ✅ axios는 .data
      } catch (err) {
        console.error("예약 현황 조회 실패:", err);
      }
    }
    fetchDashboard();
  }, [selectedActivity, activeDate]);

  if (loading) {
    return <p className="typo-14-m text-gray-600">로딩 중...</p>;
  }

  /** ✅ 체험이 하나도 없을 때 - Empty state */
  if (activities.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-20">
        <Image src={emptyState} alt="체험 없음" width={122} height={122} className="mb-4" />
        <p className="typo-16-m text-gray-600 mb-[30px]">아직 등록한 체험이 없어요</p>
        <Link href="/mypage/experience/register">
          <Button label="체험 등록하기" variant="primary" className="w-[182px] h-[54px]" />
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* ✅ 내 체험 선택 (체험이 있을 때만 보임) */}
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

      {/* ✅ 달력 */}
      {selectedActivity && (
        <Calendar
          className="rounded-2xl border border-border-default p-4 bg-white shadow-sm
                     [&_.react-calendar__tile]:py-3
                     [&_.react-calendar__navigation__label]:typo-16-b
                     [&_.react-calendar__month-view__weekdays__weekday]:typo-12-m"
          // 월 전환 시 대시보드 다시 로드 (암묵적 any 방지용으로 인라인 타입 지정)
          onActiveStartDateChange={({ activeStartDate }: { activeStartDate: Date | null }) => {
            if (activeStartDate) setActiveDate(activeStartDate);
          }}
          // 날짜 셀 커스텀 (암묵적 any 방지)
          tileContent={({ date }: { date: Date }) => {
            const day = dashboard.find((d) => d.date === toYMD(date));
            if (!day) return null;

            const { pending, confirmed, completed } = day.reservations;
            return (
              <div className="mt-1 flex flex-col gap-1">
                {pending > 0 && (
                  <Tag variant="info" size="sm">
                    신청 {pending}
                  </Tag>
                )}
                {confirmed > 0 && (
                  <Tag status="approved" size="sm">
                    승인 {confirmed}
                  </Tag>
                )}
                {completed > 0 && (
                  <Tag status="completed" size="sm">
                    완료 {completed}
                  </Tag>
                )}
              </div>
            );
          }}
          // 오늘 강조/일요일 표시 (암묵적 any 방지)
          tileClassName={({ date, view }: { date: Date; view: "month" | "year" | "decade" | "century" }) => {
            const classes: string[] = [];
            if (view === "month") {
              if (toYMD(date) === toYMD(new Date())) classes.push("ring-1 ring-primary rounded-md");
              if (date.getDay() === 0) classes.push("text-red-500");
            }
            return classes.join(" ");
          }}
        />
      )}
    </div>
  );
}
