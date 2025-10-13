"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import emptyState from "@/assets/img/empty_state.png";
import CalendarBoard from "@/app/mypage/calendar/components/calendarBoard/CalendarBoard"; // ✅ 공용 캘린더 불러오기

import {
  mockActivities,
  mockReservationDashboard,
  type MyActivity,
  type ReservationDashboard,
} from "./mockActivities";

export default function MockCalendarPage() {
  const [activities] = useState<MyActivity[]>(mockActivities);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(
    mockActivities[0]?.id ?? null
  );
  const [dashboard] = useState<ReservationDashboard[]>(
    mockReservationDashboard
  );
  const [, setActiveDate] = useState<Date>(new Date());

  /** 등록된 체험이 없을 때 */
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

  return (
    <div className="space-y-6">
      {/* ✅ 체험 선택 */}
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
            // TODO: 추후 예약 상세 모달 연결 예정
          }}
        />
      )}
    </div>
  );
}
