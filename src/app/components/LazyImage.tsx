'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  placeholder?: string;
  threshold?: number;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  onError,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuCkmuCkv+CkpOCljeCksOCkl+CkouCkvyDgpJXgpYAg4KSa4KS+4KSs4KWAPC90ZXh0Pjwvc3ZnPg==',
  threshold = 0.1,
  fill = false,
  sizes,
  width,
  height,
}) => {
  const isLocal = src.startsWith('/') || src.startsWith('data:');
  const [imageSrc, setImageSrc] = useState(isLocal ? src : placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // For external images, defer loading until in viewport
  useEffect(() => {
    if (isLocal) return;
    if (imageRef && imageSrc === placeholder) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observerRef.current?.disconnect();
            }
          });
        },
        { threshold, rootMargin: '100px 0px' }
      );

      observerRef.current.observe(imageRef);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [imageRef, imageSrc, placeholder, src, threshold, isLocal]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    } else {
      e.currentTarget.src = placeholder;
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const computedClassName = `${className} transition-opacity duration-500 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`;

  if (fill) {
    return (
      <Image
        ref={setImageRef}
        src={hasError ? placeholder : imageSrc}
        alt={alt}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={computedClassName}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        unoptimized={!isLocal}
      />
    );
  }

  // Non-fill: use provided dimensions, or let CSS control sizing via inline style
  return (
    <Image
      ref={setImageRef}
      src={hasError ? placeholder : imageSrc}
      alt={alt}
      width={width || 0}
      height={height || 0}
      sizes={sizes || '100vw'}
      className={computedClassName}
      style={!width && !height ? { width: '100%', height: 'auto' } : undefined}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      unoptimized={!isLocal}
    />
  );
};

export default LazyImage;
