'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageLoadingStrategies } from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  strategy?: 'HERO' | 'CONTENT' | 'THUMBNAIL';
  responsive?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality,
  loading,
  fetchPriority,
  className = '',
  strategy = 'CONTENT',
  responsive = false,
  sizes,
  placeholder = 'blur',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackSrc = '/images/warriors/placeholder-warrior.png';
  const effectiveSrc = src || fallbackSrc;
  const isExternal = effectiveSrc.startsWith('http');

  // Apply strategy defaults
  const strategyConfig = ImageLoadingStrategies[strategy];
  const finalLoading = loading || strategyConfig.loading;
  const finalFetchPriority = fetchPriority || strategyConfig.fetchPriority;
  const finalQuality = quality || strategyConfig.quality;
  const strategyWidth = 'width' in strategyConfig ? strategyConfig.width : undefined;
  const finalWidth = width || strategyWidth;

  // Determine effective sizes for responsive images
  const finalSizes = responsive ? sizes || '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' : undefined;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (error) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={finalWidth || 800}
        height={height || 600}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={effectiveSrc}
      sizes={finalSizes}
      alt={alt}
      width={finalWidth}
      height={height}
      quality={finalQuality}
      loading={finalLoading}
      fetchPriority={finalFetchPriority}
      unoptimized={isExternal}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      style={{
        transition: 'opacity 0.4s ease-in-out, filter 0.4s ease-in-out',
        opacity: isLoaded ? 1 : placeholder === 'blur' ? 0.6 : 1,
        filter: placeholder === 'blur' && !isLoaded ? 'blur(8px)' : 'none',
      }}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
