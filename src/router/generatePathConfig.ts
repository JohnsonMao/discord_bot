import type { ComponentType } from "react";
import type { Importer } from "@/router/withSuspense";

export interface PathConfig {
  [path: string]: Importer | PathConfig;
}

/** 根據 `/pages/[file].tsx` 下的資料夾結構生成對應 url 的頁面 */
export default function generatePathConfig(): PathConfig {
  const modules = import.meta.glob<boolean, string, { default: ComponentType }>(
    ["../pages/**/{page,layout,not_found}.{ts,tsx}"]
  );

  const pathConfig: PathConfig = {};

  Object.entries(modules).forEach(([filePath, importer]) => {
    let config = pathConfig;
    const routePath = filePath
      .replace("../pages/", "")
      .replace(/.tsx?/, "")
      .replace(/\[([\w-]+)]/gm, ":$1")
      .split("/");

    routePath.forEach((path, index) => {
      if (index === routePath.length - 1) {
        config[path] = importer;
      } else {
        config[path] = config[path] || {};
        config = config[path] as PathConfig;
      }
    });
  });

  return pathConfig;
}
