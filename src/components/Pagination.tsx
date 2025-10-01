"use client";
import clsx from "clsx";
import Image from "next/image";

import chevronLeft from "@/assets/icon/icon_chevron_left.svg";
import chevronRight from "@/assets/icon/icon_chevron_right.svg";
import chevronLeftHover from "@/assets/icon/icon_chevron_left_hover.svg";
import chevronRightHover from "@/assets/icon/icon_chevron_right_hover.svg";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange?: (p: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  const go = (p: number) =>
    onChange?.(Math.max(1, Math.min(totalPages, p)));

  const items = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={clsx(
        "w-full flex items-center justify-center gap-1 py-3 rounded-xl border-2 border-violet-300/60 border-dashed bg-white dark:bg-gray-900",
        className
      )}
    >
      {/* 이전 버튼 */}
      <button
        className="h-8 w-8 rounded-lg flex items-center justify-center group"
        onClick={() => go(page - 1)}
        aria-label="이전"
      >
        <Image
          src={chevronLeft}
          alt="이전"
          width={16}
          height={16}
          className="group-hover:hidden"
        />
        <Image
          src={chevronLeftHover}
          alt="이전(호버)"
          width={16}
          height={16}
          className="hidden group-hover:block"
        />
      </button>

      {/* 페이지 번호 */}
      {items.map((n) => (
        <button
          key={n}
          onClick={() => go(n)}
          className={clsx(
            "h-8 w-8 rounded-lg typo-12b",
            n === page
              ? "bg-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          {n}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        className="h-8 w-8 rounded-lg flex items-center justify-center group"
        onClick={() => go(page + 1)}
        aria-label="다음"
      >
        <Image
          src={chevronRight}
          alt="다음"
          width={16}
          height={16}
          className="group-hover:hidden"
        />
        <Image
          src={chevronRightHover}
          alt="다음(호버)"
          width={16}
          height={16}
          className="hidden group-hover:block"
        />
      </button>
    </div>
  );
}
