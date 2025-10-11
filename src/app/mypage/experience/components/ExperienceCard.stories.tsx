// ExperienceCard.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import ExperienceCard from "./ExperienceCard";

const meta: Meta<typeof ExperienceCard> = {
  title: "Mypage/ExperienceCard",
  component: ExperienceCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExperienceCard>;

// 기본 스토리 (PC 뷰)
export const Default: Story = {
  args: {
    title: "함께 배우면 즐거운 스트릿 댄스",
    rating: 4.9,
    reviewCount: 293,
    price: 10000,
    imageUrl: "https://picsum.photos/200",
  },
};

// 모바일 뷰포트에서 확인하는 스토리
export const Mobile: Story = {
  args: {
    title: "모바일 뷰 테스트용 카드",
    rating: 4.5,
    reviewCount: 120,
    price: 15000,
    imageUrl: "https://picsum.photos/200",
  },
  parameters: {
    viewport: {
      defaultViewport: "iphone6", // 스토리북 기본 제공 뷰포트
    },
  },
};

// 태블릿 뷰포트에서 확인하는 스토리
export const Tablet: Story = {
  args: {
    title: "태블릿 뷰 테스트용 카드",
    rating: 4.7,
    reviewCount: 200,
    price: 20000,
    imageUrl: "https://picsum.photos/200",
  },
  parameters: {
    viewport: {
      defaultViewport: "ipad",
    },
  },
};
