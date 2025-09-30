import type { Meta, StoryObj } from "@storybook/react";
import SideMenu from "@/components/SideMenu";

const meta = {
  title: "Components/SideMenu",
  component: SideMenu,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
