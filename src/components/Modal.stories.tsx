import type { Meta, StoryObj } from "@storybook/react";
import Modal from "@/components/Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    open: true,
    title: "확인",
    children: "정말로 삭제하시겠습니까?",
    confirmText: "확인",
    cancelText: "취소",
    onClose: () => console.log('모달 닫기'),
    onConfirm: () => console.log('확인 클릭'),
  }
};

export const Closed: Story = {
  args: {
    open: false,
    title: "닫힌 모달",
    children: "이 모달은 보이지 않습니다.",
  }
};

export const CustomButtons: Story = {
  args: {
    open: true,
    title: "사용자 정의 버튼",
    children: "버튼 텍스트를 커스터마이징할 수 있습니다.",
    confirmText: "동의",
    cancelText: "거부",
  }
};

export const LongContent: Story = {
  args: {
    open: true,
    title: "긴 내용",
    children: (
      <div>
        <p>첫 번째 문단입니다.</p>
        <p>두 번째 문단으로 더 긴 내용을 보여줍니다.</p>
        <ul>
          <li>목록 항목 1</li>
          <li>목록 항목 2</li>
        </ul>
      </div>
    ),
    widthClass: "max-w-lg",
  }
};
