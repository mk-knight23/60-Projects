// @ts-nocheck
import * as __fd_glob_17 from "../content/docs/tools/overview.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/web-apps/overview.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/portfolio/overview.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/starters/overview.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/games/overview.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/getting-started/tech-stack.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/getting-started/running-projects.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/getting-started/overview.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/deployment/overview.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_7 } from "../content/docs/tools/meta.json?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/starters/meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/web-apps/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/portfolio/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/getting-started/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/games/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/deployment/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "deployment/meta.json": __fd_glob_1, "games/meta.json": __fd_glob_2, "getting-started/meta.json": __fd_glob_3, "portfolio/meta.json": __fd_glob_4, "web-apps/meta.json": __fd_glob_5, "starters/meta.json": __fd_glob_6, "tools/meta.json": __fd_glob_7, }, {"index.mdx": __fd_glob_8, "deployment/overview.mdx": __fd_glob_9, "getting-started/overview.mdx": __fd_glob_10, "getting-started/running-projects.mdx": __fd_glob_11, "getting-started/tech-stack.mdx": __fd_glob_12, "games/overview.mdx": __fd_glob_13, "starters/overview.mdx": __fd_glob_14, "portfolio/overview.mdx": __fd_glob_15, "web-apps/overview.mdx": __fd_glob_16, "tools/overview.mdx": __fd_glob_17, });