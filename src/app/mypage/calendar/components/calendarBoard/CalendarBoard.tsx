"use client";

import { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Tag from "@/components/Tag";
import "./CalendarBoard.css";

type ReservationSummary = {
  date: string; // YYYY-MM-DD
  reservations: {
    completed: number; // 완료
    confirmed: number; // 승인
    pending: number;   // 예약(신청)
  };
};

interface CalendarBoardProps {
  /** YYYY-MM-DD 단위의 집계 데이터 */
  data: ReservationSummary[];
  /** 월 변경 콜백 (달 이동 시) */
  onMonthChange?: (date: Date) => void;
  /** 날짜 클릭 콜백 (→ 모달 오픈에 연결) */
  onDateClick?: (date: Date) => void;
}

/** YYYY-MM-DD */
function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function CalendarBoard({
  data,
  onMonthChange,
  onDateClick,
}: CalendarBoardProps) {
  // 조회 성능 위해 맵으로 보관
  const map = useMemo(() => {
    const m = new Map<string, ReservationSummary>();
    data.forEach((d) => m.set(d.date, d));
    return m;
  }, [data]);

  return (
    <div className="calendar-card">
      <Calendar
        // 👉 텍스트/요일/월 표기 형식
        locale="ko-KR"
        formatDay={(_, date) => String(date.getDate())} // '1일' 대신 '1'
        formatShortWeekday={(_, date) => "SMTWTFS"[date.getDay()]} // S M T W T F S
        formatMonthYear={(_, date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }
        // 👉 이벤트
        onClickDay={(date) => onDateClick?.(date)}
        onActiveStartDateChange={({ activeStartDate }) =>
          activeStartDate && onMonthChange?.(activeStartDate)
        }
        // 👉 클래스 (틀만 잡고, 핵심 스타일은 CSS 파일에서 강제 오버라이드)
        className="calendar-board"
        // 👉 날짜 타일 내부 커스텀
        tileContent={({ date }) => {
          const day = map.get(toYMD(date));
          if (!day) return null;

          const { pending, confirmed, completed } = day.reservations;
          const hasAny = pending + confirmed + completed > 0;

          return (
            <>
              {/* 빨간 점 (예약이 있는 날짜만) */}
              {hasAny && (
                <span
                  className="cb-dot"
                  aria-hidden
                />
              )}

              {/* 상태 태그 (공통 Tag 컴포넌트 사용) */}
              <div className="cb-tags">
                {pending > 0 && (
                  <Tag variant="info" size="sm">
                    예약 {pending}
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
            </>
          );
        }}
      />
    </div>
  );
}
