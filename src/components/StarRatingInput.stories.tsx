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

export const Primary: Story = { args: {} };
