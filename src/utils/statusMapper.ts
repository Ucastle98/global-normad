// src/utils/statusMapper.ts
export function mapReservationStatus(status: string): 
  "default" | "success" | "warning" | "info" | "error" {
  switch (status) {
    case "pending":   // 예약 신청
      return "info";
    case "confirmed": // 예약 승인
      return "success";
    case "declined":  // 예약 거절
      return "error";
    case "canceled":  // 예약 취소
      return "warning";
    case "completed": // 체험 완료
      return "default";
    default:
      return "default";
  }
}