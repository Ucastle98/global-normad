// scripts/generate-stories.mjs
import { promises as fs } from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const SRC_DIR = path.join(projectRoot, "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");

// 대상: src/components/**/[A-Z]*.(tsx|jsx) (stories 파일 제외)
const exts = new Set([".tsx", ".jsx"]);
const isStory = (p) => /\.stories\.(t|j)sx?$/.test(p);
const isEligible = (file) => {
  const ext = path.extname(file);
  const base = path.basename(file);
  return exts.has(ext) && /^[A-Z]/.test(base) && !isStory(file);
};

// 재귀적으로 파일 찾기
async function walk(dir) {
  const out = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) out.push(...(await walk(p)));
    else if (it.isFile()) out.push(p);
  }
  return out;
}

function toImportPath(absFile) {
  // '@/...' 별칭으로 변환 (src 이후 경로)
  const relFromSrc = path.relative(SRC_DIR, absFile).replace(/\\/g, "/");
  const noExt = relFromSrc.replace(/\.(t|j)sx?$/, "");
  // index 파일이면 디렉토리까지만
  return noExt.endsWith("/index") ? `@/${noExt.slice(0, -("/index".length))}` : `@/${noExt}`;
}

function guessComponentName(absFile, source) {
  // export default function Name()
  let m = source.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  if (m) return m[1];
  // export default Name;
  m = source.match(/export\s+default\s+([A-Za-z0-9_]+)\s*;/);
  if (m) return m[1];
  // const Name = (...) => ... ; export default Name
  m = source.match(/const\s+([A-Za-z0-9_]+)\s*=\s*\(.*?\)[\s\S]*?export\s+default\s+\1/);
  if (m) return m[1];
  // 파일명으로 추정
  const base = path.basename(absFile).replace(/\.(t|j)sx?$/, "");
  return base === "index" ? path.basename(path.dirname(absFile)) : base;
}

function storyTemplate({ titlePath, importPath, componentName }) {
  return `import type { Meta, StoryObj } from "@storybook/react";
import ${componentName} from "${importPath}";

const meta = {
  title: "${titlePath}",
  component: ${componentName},
  parameters: { layout: "centered" },
  args: {},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };
`;
}

async function ensureStory(file) {
  const src = await fs.readFile(file, "utf8");
  const importPath = toImportPath(file);
  const componentName = guessComponentName(file, src);

  // 스토리 파일 경로 결정
  const dir = path.dirname(file);
  const base = path.basename(file).replace(/\.(t|j)sx?$/, "");
  const storyBase = base === "index" ? path.basename(dir) : base;
  const storyFile = path.join(dir, `${storyBase}.stories.tsx`);

  // 이미 있으면 건너뜀
  try {
    await fs.access(storyFile);
    return { created: false, storyFile };
  } catch {}

  // title: Components/… 형태로 구성
  const relFromComponents = path
    .relative(COMPONENTS_DIR, dir)
    .split(path.sep)
    .filter(Boolean);
  const titlePath = ["Components", ...relFromComponents, storyBase].join("/");

  const content = storyTemplate({ titlePath, importPath, componentName });
  await fs.writeFile(storyFile, content, "utf8");
  return { created: true, storyFile };
}

(async () => {
  try {
    const all = await walk(COMPONENTS_DIR);
    const targets = all.filter(isEligible);
    if (targets.length === 0) {
      console.log("No eligible component files found.");
      process.exit(0);
    }
    let created = 0;
    for (const f of targets) {
      const { created: c, storyFile } = await ensureStory(f);
      if (c) {
        created++;
        console.log("Created:", path.relative(projectRoot, storyFile));
      }
    }
    console.log(`\nDone. New stories: ${created}/${targets.length}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
