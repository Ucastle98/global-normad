import type { Meta, StoryObj } from "@storybook/react";
import Footer from "@/components/Footer";

const meta = {
  title: "Components/Footer",      // 스토리북 UI에 보이는 이름
  component: Footer,
  parameters: { layout: "fullscreen" }, // 👈 화면 꽉 채워보기
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {}, // Footer에 props가 있다면 여기에 기본값 넣기
};
