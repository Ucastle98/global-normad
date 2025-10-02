import type { Meta, StoryObj } from "@storybook/react";
import ExperienceCard from "./ExperienceCard";

const meta: Meta<typeof ExperienceCard> = {
  title: "Mypage/ExperienceCard",
  component: ExperienceCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {
  args: {
    title: "함께 배우면 즐거운 스트릿 댄스",
    rating: 4.9,
    reviewCount: 293,
    price: 10000,
    imageUrl: "/images/balloon.jpg", // 실제 이미지 경로로 변경
  },
};
