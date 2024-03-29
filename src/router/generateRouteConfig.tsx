import type { RouteObject } from "react-router-dom";
import generatePathConfig, { PathConfig } from "./generatePathConfig";
import withSuspense, { Importer } from "./withSuspense";
import ErrorBoundary from "./ErrorBoundary";

function checkImporter(importer: PathConfig | Importer): Importer | undefined {
  return typeof importer === "function" ? importer : undefined;
}

function mapPathConfigToRoute(config: PathConfig): RouteObject[] {
  return Object.entries(config).map(([routePath, child]) => {
    if (typeof child === "function") {
      return {
        path: "",
        element: withSuspense(child),
      };
    }

    const { layout, not_found, ...rest } = child;
    const children = mapPathConfigToRoute(rest);

    if (typeof not_found === "function") {
      children.push({
        path: "*",
        element: withSuspense(not_found),
      });
    }

    return {
      path: routePath.match(/^\(.*\)$/) ? "" : routePath,
      element: withSuspense(checkImporter(layout)),
      ErrorBoundary,
      children,
    };
  });
}

export default function generateRouteConfig(): RouteObject[] {
  const { layout, not_found, ...rest } = generatePathConfig();

  return [
    {
      path: "/",
      element: withSuspense(checkImporter(layout)),
      children: [
        ...mapPathConfigToRoute(rest),
        {
          path: "*",
          element: withSuspense(checkImporter(not_found)),
        },
      ],
    },
  ];
}
