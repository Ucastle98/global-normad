import type { Meta, StoryObj } from "@storybook/react";
import Tag from "@/components/Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
