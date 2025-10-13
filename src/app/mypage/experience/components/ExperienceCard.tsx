"use client";
import Button from "@/components/Button";
import IconStar from "@/assets/icon/icon_star_on.svg";
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
    <div className="flex rounded-3xl bg-white shadow-[0_4px_24px_rgba(156,180,202,0.2)] p-6 max-w-2xl  ">
      <div className="flex-1 ">
        <h3 className="typo-16-b md:typo-18-b">{title}</h3>
        <div className="flex mt-2 gap-0.5">
          <Image
            src={IconStar}
            alt="별점"
            width={14}
            height={14}
            className="mr-1 md:w-4 md:h-4"
          />
          <span className="typo-13-m text-[#84888C]  md:typo-16-m">
            {rating}
          </span>
          <span className="typo-13-m text-[#84888C]  md:typo-16-m">
            ({reviewCount})
          </span>
        </div>
        <div className="mt-2">
          <span className="typo-16-b md:typo-18-b">
            ₩{price.toLocaleString()}
          </span>
          <span className="typo-14-m text-[#9F9DA7]  md:typo-16-m"> / 인</span>
        </div>
        <div className="mt-3">
          <Button
            label="수정하기"
            variant="ghost"
            onClick={onEdit}
            className="typo-14-m mr-2"
          />
          <Button
            label="삭제하기"
            variant="secondary"
            onClick={onDelete}
            className="typo-14-m"
          />
        </div>
      </div>
      {/* 오른쪽 이미지 */}
      <div className="relative ml-6 w-[82px] h-[82px] md:w-[142px] md:h-[142px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-3xl md:rounded-[32px] object-cover"
        />
      </div>
    </div>
  );
}
