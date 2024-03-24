import { ReactNode, Suspense, lazy } from "react";

export type Importer = Parameters<typeof lazy>[0];

export default function LazySuspense(importer?: Importer, loading?: ReactNode) {
  if (typeof importer !== "function") return null;

  const LazyComponent = lazy(importer);

  return (
    <Suspense fallback={loading}>
      <LazyComponent />
    </Suspense>
  );
}
