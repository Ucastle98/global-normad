export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationsResponse {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}