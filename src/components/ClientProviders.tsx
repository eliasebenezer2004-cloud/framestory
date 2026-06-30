'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LenisSmoothScroll from './LenisSmoothScroll';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <LenisSmoothScroll />
      <div className={isLoaded ? 'page-transition' : 'opacity-0'}>
        {children}
      </div>
    </>
  );
}
