import type { Meta, StoryObj } from '@storybook/react';
import ListCard from './ListCard';

const meta = {
  title: 'Components/ListCard',
  component: ListCard,
  parameters: { layout: 'padded' }, // or 'fullscreen'
  args: {
    // ✅ 컴포넌트에서 요구하는 필수 값들을 “실제처럼” 채우기
    thumbnailSrc: 'https://placehold.co/96x96',   // or /img/sample.png
    title: '연가구 투어',
    subtitle: '성인 2명 · 09:00–13:30',
    priceText: '₩ 35,000~',
    badge: '예약완료',              // status/badge 비슷한 prop이 있으면
    actionText: '자세히',           // 버튼 라벨 prop이 있으면
  },
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithActionHandler: Story = {
  args: {
    onClickAction: () => alert('자세히 클릭'),
  },
};

export const LongTexts: Story = {
  args: {
    title: '글자가 아주 길 때는 이렇게 말줄임 처리가 되는지 테스트합니다',
    subtitle: '설명도 길 때 한 줄/두 줄 클램프가 적용되는지 확인합니다',
  },
};
