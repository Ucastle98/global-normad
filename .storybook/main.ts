import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: { name: '@storybook/nextjs', options: {} },
  stories: ['../src/**/*/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  // ✅ v9에서는 essentials/controls/actions/viewport 따로 적지 않습니다.
  addons: [
    '@storybook/addon-a11y', // 선택
  ],
  staticDirs: ['../public'],
};
export default config;
