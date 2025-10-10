// /mypage/mock/mockActivities.ts
export type MyActivity = {
  id: number;
  title: string;
};

export type ReservationDashboard = {
  date: string; // YYYY-MM-DD
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

// ✅ 체험 리스트 목데이터
export const mockActivities: MyActivity[] = [
  { id: 1, title: "서울 야경 사진 투어" },
  { id: 2, title: "부산 해운대 서핑 클래스" },
  { id: 3, title: "제주 감귤 농장 체험" },
];

// ✅ 예약 현황 목데이터 (예시: 2025년 10월)
export const mockReservationDashboard: ReservationDashboard[] = [
  {
    date: "2025-10-03",
    reservations: { completed: 2, confirmed: 1, pending: 0 },
  },
  {
    date: "2025-10-10",
    reservations: { completed: 0, confirmed: 2, pending: 3 },
  },
  {
    date: "2025-10-16",
    reservations: { completed: 1, confirmed: 0, pending: 1 },
  },
  {
    date: "2025-10-24",
    reservations: { completed: 3, confirmed: 2, pending: 0 },
  },
];
