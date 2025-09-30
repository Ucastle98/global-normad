import type { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
