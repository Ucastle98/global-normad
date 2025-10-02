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

export const Primary: Story = { 
  args: {
    label: "체크박스 라벨"
  }
};

// 추가 스토리 예시들
export const WithDescription: Story = {
  args: {
    label: "체크박스 라벨",
    description: "설명 텍스트입니다"
  }
};

export const Checked: Story = {
  args: {
    label: "선택된 체크박스",
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    label: "비활성화된 체크박스",
    disabled: true
  }
};
