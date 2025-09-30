import type { Meta, StoryObj } from "@storybook/react";
import GNB from "@/components/GNB";

const meta = {
  title: "Components/GNB",
  component: GNB,
  parameters: { layout: 'fullscreen' },
  args: {},
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
