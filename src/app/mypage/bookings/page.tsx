"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ListCard from "@/components/ListCard";
import Button from "@/components/Button";
import Image from "next/image";
import logoAuth from "@/assets/img/empty_state.png";
import api from "@/utils/api";
import { MyReservationsResponse, Reservation } from "@/types/reservation";

export default function BookingsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get<MyReservationsResponse>("/my-reservations");
        setReservations(res.data.reservations); // ✅ data 안에서 꺼내야 함
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return reservations.length > 0 ? (
    <div className="space-y-4">
      {reservations.map((r) => (
        <ListCard
          key={r.id}
          thumbnail={r.activity.bannerImageUrl}
          title={r.activity.title}
          subtitle={`${r.date} · ${r.startTime} - ${r.endTime}`}
          status={r.status} // ✅ API 상태값 그대로 전달
          price={`₩${r.totalPrice.toLocaleString()}`}
          ctaLabel="자세히"
          onClickCTA={() => alert(`예약 ID: ${r.id}`)}
        />
      ))}
    </div>
  ) : (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <Image
        src={logoAuth}
        alt="예약 없음"
        width={122}
        height={122}
        className="mb-4"
      />
      <p className="typo-16-m text-gray-600 mb-[30px]">아직 예약한 체험이 없어요</p>
      <Link href="/activities">
        <Button label="둘러보기" variant="primary" className="w-[182px] h-[54px]" />
      </Link>
    </section>
  );
}
