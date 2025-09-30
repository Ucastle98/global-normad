// .storybook/preview.ts
import type { Preview } from "storybook";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "min-h-screen bg-gray-50 p-6" },
        React.createElement(Story)
      ),
  ],
};

export default preview;
