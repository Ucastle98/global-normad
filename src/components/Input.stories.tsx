import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
