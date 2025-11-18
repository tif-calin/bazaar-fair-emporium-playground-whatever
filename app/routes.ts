import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const PAGES = [
  {
    urlPath: "refuge2",
    componentPath: "pages/refuge2/index.tsx",
  },
  {
    urlPath: "cladetable",
    componentPath: "pages/cladetable/index.tsx",
  },
];

export default [
  index("pages/home/index.tsx"),
  ...PAGES.map(({ urlPath, componentPath }) => route(urlPath, componentPath)),
] satisfies RouteConfig;
