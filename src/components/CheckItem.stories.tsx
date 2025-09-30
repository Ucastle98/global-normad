import type { Meta, StoryObj } from "@storybook/react";
import CheckItem from "@/components/CheckItem";

const meta = {
  title: "Components/CheckItem",
  component: CheckItem,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof CheckItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
