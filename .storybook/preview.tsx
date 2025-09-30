import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    viewport: {},
  },
  decorators: [
    (Story: any) => (
      <div className="min-h-screen bg-gray-50 p-6">
        <Story />
      </div>
    ),
  ],
};

export default preview;
