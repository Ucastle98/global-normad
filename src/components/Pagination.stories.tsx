// Pagination.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  args: {
    page: 1,
    totalPages: 5,           // ✅ 필수
    onChange: (p: number) => console.log('page ->', p),
  },
  parameters: { layout: 'centered' }, // 가운데 정렬 (원하면 fullscreen)
};
export default meta;

export const Primary: StoryObj<typeof Pagination> = {};
