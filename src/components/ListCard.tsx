"use client";
import clsx from "clsx";
import Tag from "@/components/Tag";
import Button from "@/components/Button";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface ListCardProps {
  thumbnail: string;
  title: string;
  subtitle?: string; // 예: 인원/시간 등
  status?: ReservationStatus; // API 상태값 그대로 받음
  price: string; // "₩ 35,000~"
  priceSub?: string; // "세금 포함" 등
  ctaLabel?: string; // 버튼 텍스트
  className?: string;
  onClickCTA?: () => void;
}

function mapReservationStatus(apiStatus: ReservationStatus | undefined) {
  switch (apiStatus) {
    case "pending":
      return { variant: "warning" as const, text: "확인 요청" };
    case "confirmed":
      return { variant: "success" as const, text: "예약 완료" };
    case "declined":
      return { variant: "error" as const, text: "거절됨" };
    case "canceled":
      return { variant: "default" as const, text: "취소됨" };
    case "completed":
      return { variant: "info" as const, text: "이용 완료" };
    default:
      return { variant: "default" as const, text: "" };
  }
}

export default function ListCard({
  thumbnail,
  title,
  subtitle,
  status,
  price,
  priceSub,
  ctaLabel = "자세히",
  className,
  onClickCTA,
}: ListCardProps) {
  const { variant, text } = mapReservationStatus(status);

  return (
    <div
      className={clsx(
        "rounded-2xl bg-white dark:bg-gray-900 border border-border-default p-4 flex items-center gap-4",
        className
      )}
    >
      <img
        src={thumbnail}
        alt=""
        className="w-24 h-24 rounded-xl object-cover shrink-0"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {text && <Tag variant={variant}>{text}</Tag>}
        </div>

        <div className="mt-1 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="typo-16-b truncate">{title}</h4>
            {subtitle && (
              <p className="typo-12-m text-text-secondary mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            <div className="typo-16-b">{price}</div>
            {priceSub && (
              <div className="typo-12-m text-text-secondary">{priceSub}</div>
            )}
          </div>
        </div>
      </div>

      <Button label={ctaLabel} size="sm" onClick={onClickCTA} />
    </div>
  );
}
