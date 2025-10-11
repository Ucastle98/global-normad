import type { Meta, StoryObj } from '@storybook/react';
import ListCard from './ListCard';

const meta = {
  title: 'Components/ListCard',
  component: ListCard,
  parameters: { layout: 'padded' }, // or 'fullscreen'
  args: {
    // ✅ 컴포넌트에서 요구하는 필수 값들을 “실제처럼” 채우기
    thumbnail: 'https://placehold.co/96x96',   // thumbnailSrc → thumbnail로 수정
    title: '연가구 투어',
    subtitle: '성인 2명 · 09:00–13:30',
    price: '₩ 35,000~',              // priceText → price
    priceSub: '세금 포함',           // 추가 가격 정보
    status: 'confirmed',             // badge → status (ReservationStatus 타입)
    ctaLabel: '자세히',              // actionText → ctaLabel
    onClickCTA: () => console.log('CTA 클릭'),
  },
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    thumbnail: 'https://placehold.co/96x96',
    title: '연가구 투어',
    subtitle: '성인 2명 · 09:00–13:30',
    price: '₩ 35,000~',
    status: 'confirmed',
    ctaLabel: '자세히'
  }
};

export const Pending: Story = {
  args: {
    thumbnail: 'https://placehold.co/96x96',
    title: '열기구 체험',
    subtitle: '성인 4명 · 14:00–18:00',
    price: '₩ 85,000',
    priceSub: '세금 포함',
    status: 'pending',
    ctaLabel: '확인하기'
  }
};

export const Canceled: Story = {
  args: {
    thumbnail: 'https://placehold.co/96x96',
    title: '서핑 레슨',
    price: '₩ 45,000',
    status: 'canceled'
  }
};

export const WithActionHandler: Story = {
  args: {
    thumbnail: 'https://placehold.co/96x96',
    title: '연가구 투어',
    subtitle: '성인 2명 · 09:00–13:30',
    price: '₩ 35,000~',
    status: 'confirmed',
    ctaLabel: '자세히',
    onClickCTA: () => alert('자세히 클릭'),  // onClickAction → onClickCTA
  },
};

export const LongTexts: Story = {
  args: {
    title: '글자가 아주 길 때는 이렇게 말줄임 처리가 되는지 테스트합니다',
    subtitle: '설명도 길 때 한 줄/두 줄 클램프가 적용되는지 확인합니다',
  },
};
