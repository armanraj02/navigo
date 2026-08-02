import { useEffect, useState } from "react";
import { AssetManager, LoadedAssets } from "./AssetManager";

export const usePreloadAssets = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [assets, setAssets] = useState<LoadedAssets | null>(null);

  useEffect(() => {
    const manager = AssetManager.getInstance();
    manager.preloadAll((p) => setProgress(p))
      .then((loaded) => {
        setAssets(loaded);
        setLoading(false);
      });
  }, []);

  return { loading, progress, assets };
};
