// .storybook/main.ts
import type { StorybookConfig } from "storybook"; // v9 타입
import path from "path";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (cfg) => {
    // ----- resolve -----
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
      "next/image": path.resolve(__dirname, "./mocks/NextImageMock.tsx"),
    };
    cfg.resolve.extensions = [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ...(cfg.resolve.extensions || []),
    ];
    cfg.resolve.fallback = {
      ...(cfg.resolve.fallback || {}),
      process: require.resolve("process/browser"),
    };

    // ----- module.rules 초기화 -----
    if (!cfg.module) cfg.module = { rules: [] };
    if (!cfg.module.rules) cfg.module.rules = [];

    // (A) TS/TSX -> Babel 변환
    cfg.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { targets: "defaults" }],
            ["@babel/preset-react", { runtime: "automatic" }],
            ["@babel/preset-typescript", { allowDeclareFields: true }],
          ],
        },
      },
    });

    // (B) CSS + PostCSS(Tailwind) 처리
    // 기존 css 룰 제거
    cfg.module.rules = cfg.module.rules.filter(
      (rule: any) => !(rule?.test && rule.test.toString().includes("css"))
    );
    // 새로운 css 룰 추가
    cfg.module.rules.push({
      test: /\.css$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { importLoaders: 1 },
        },
        "postcss-loader", // Tailwind 지시어(@tailwind base 등) 처리
      ],
    });

    // (C) SVG/이미지 처리
    cfg.module.rules = cfg.module.rules.filter(
      (rule: any) => !(rule?.test && rule.test.toString().includes("svg"))
    );
    cfg.module.rules.push(
      {
        test: /\.svg$/i,
        oneOf: [
          { resourceQuery: /component/, use: ["@svgr/webpack"] },
          { type: "asset/resource" },
        ],
      },
      { test: /\.(png|jpe?g|gif|webp|ico)$/i, type: "asset/resource" }
    );

    // (D) 전역에 process 주입
    cfg.plugins = [
      ...(cfg.plugins || []),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ];

    return cfg;
  },
};

export default config;
