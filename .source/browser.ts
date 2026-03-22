// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "deployment/overview.mdx": () => import("../content/docs/deployment/overview.mdx?collection=docs"), "getting-started/overview.mdx": () => import("../content/docs/getting-started/overview.mdx?collection=docs"), "getting-started/running-projects.mdx": () => import("../content/docs/getting-started/running-projects.mdx?collection=docs"), "getting-started/tech-stack.mdx": () => import("../content/docs/getting-started/tech-stack.mdx?collection=docs"), "games/overview.mdx": () => import("../content/docs/games/overview.mdx?collection=docs"), "starters/overview.mdx": () => import("../content/docs/starters/overview.mdx?collection=docs"), "portfolio/overview.mdx": () => import("../content/docs/portfolio/overview.mdx?collection=docs"), "web-apps/overview.mdx": () => import("../content/docs/web-apps/overview.mdx?collection=docs"), "tools/overview.mdx": () => import("../content/docs/tools/overview.mdx?collection=docs"), }),
};
export default browserCollections;