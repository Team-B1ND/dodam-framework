'use client';

import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

const CacheProvider = EmotionCacheProvider as React.ComponentType<{
  value: ReturnType<typeof createCache>;
  children: React.ReactNode;
}>;

export const DdsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
