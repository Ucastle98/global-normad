// .storybook/mocks/NextImageMock.tsx
import * as React from "react";

// next/image 대체: 스토리북에서는 그냥 <img>로 렌더
// width/height, alt 등 기본 속성만 전달
const NextImageMock = ({
  src,
  alt,
  width,
  height,
  style,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number | string;
  height?: number | string;
}) => {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <img
      src={typeof src === "string" ? src : (src as any)?.src ?? ""}
      alt={alt ?? ""}
      style={{ width: w, height: h, ...(style || {}) }}
      {...rest}
    />
  );
};

export default NextImageMock;
