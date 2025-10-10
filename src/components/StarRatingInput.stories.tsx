import type { Meta, StoryObj } from "@storybook/react";
import StarRatingInput from "@/components/StarRatingInput";

const meta = {
  title: "Components/StarRatingInput",
  component: StarRatingInput,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof StarRatingInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    initialRating: 3,
    maxStars: 5,
    onChange: (rating: number) => console.log('별점 변경:', rating),
  }
};

export const EmptyRating: Story = {
  args: {
    initialRating: 0,
    onChange: (rating: number) => console.log('별점 선택:', rating),
  }
};

export const FullRating: Story = {
  args: {
    initialRating: 5,
    onChange: (rating: number) => console.log('별점 변경:', rating),
  }
};

export const CustomMaxStars: Story = {
  args: {
    initialRating: 2,
    maxStars: 3,
    onChange: (rating: number) => console.log('별점 (3점 만점):', rating),
  }
};

export const Interactive: Story = {
  args: {
    initialRating: 4,
    onChange: (rating: number) => alert(`${rating}점을 주셨습니다!`),
  }
};
