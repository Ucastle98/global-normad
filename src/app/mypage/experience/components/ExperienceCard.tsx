"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

type ExperienceCardProps = {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ExperienceCard({
  title,
  rating,
  reviewCount,
  price,
  imageUrl,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  return (
    <div className="flex items-center rounded-3xl bg-white shadow-[0_4px_24px_rgba(156,180,202,0.2)] p-6 max-w-2xl  ">
      <div className="flex-row items-center">
        <h3 className="typo-16-b">{title}</h3>
        <div>
          <Image
            src="/src/assets/icon/icon_star_on.svg"
            alt="별점"
            width={14}
            height={14}
            className="mr-1"
          />
          <span className="typo-13-m">{rating}</span>
          <span className="typo-13-m">({reviewCount})</span>
        </div>
        <div>
          <span className="typo-16-b">₩{price}</span>
          <span className="typo-14-m">/인</span>
        </div>
        <div>
          <Button
            label="수정하기"
            variant="ghost"
            onClick={onEdit}
            className="typo-14-m"
          />
          <Button
            label="삭제하기"
            variant="secondary"
            onClick={onDelete}
            className="typo-14-m"
          />
        </div>
      </div>
      {/* 이미지 */}
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={82}
          height={82}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}
