import type { ComponentType } from "react";
import type { Importer } from "@/router/withSuspense";

export interface PathConfig {
  [path: string]: Importer | PathConfig;
}

/** 根據 `/pages/[file].tsx` 下的資料夾結構生成對應 url 的頁面 */
export default function generatePathConfig(): PathConfig {
  const modules = import.meta.glob<boolean, string, { default: ComponentType }>(
    ["../pages/**/{page,layout,not_found}.tsx"]
  );
  const castPath = (path: string): string[] =>
    path
      .replace("../pages/", "")
      .replace(/\.tsx$/, "")
      .replace(/\[([\w\-_]+)]/gm, ":$1")
      .split("/");

  return Object.entries(modules).reduce<PathConfig>(
    (pathConfig, [filePath, importer]) => {
      const path = castPath(filePath);
      const lastIndex = path.length - 1;
      let config = pathConfig;

      path.forEach((path, index) => {
        if (index !== lastIndex) {
          config[path] = config[path] || {};
          config = config[path] as PathConfig;
        } else {
          config[path] = importer;
        }
      });
      return pathConfig;
    },
    {}
  );
}
