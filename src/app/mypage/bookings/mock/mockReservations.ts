export type MockReservation = {
  id: number;
  activity: {
    title: string;
    bannerImageUrl: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "canceled" | "completed";
  totalPrice: number;
};

export const mockReservations: MockReservation[] = [
  {
    id: 1,
    activity: {
      title: "서울 야경 사진 투어",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800",
    },
    date: "2025-10-10",
    startTime: "18:00",
    endTime: "21:00",
    status: "confirmed",
    totalPrice: 85000,
  },
  {
    id: 2,
    activity: {
      title: "한강 요트 체험",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800",
    },
    date: "2025-10-12",
    startTime: "14:00",
    endTime: "17:00",
    status: "pending",
    totalPrice: 120000,
  },
  {
    id: 3,
    activity: {
      title: "북촌 한옥 마을 투어",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",
    },
    date: "2025-10-20",
    startTime: "10:00",
    endTime: "12:00",
    status: "completed",
    totalPrice: 60000,
  },
  {
    id: 4,
    activity: {
      title: "한옥 요리 클래스",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800",
    },
    date: "2025-10-25",
    startTime: "11:00",
    endTime: "13:00",
    status: "canceled",
    totalPrice: 90000,
  },
];
