'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
 getOptimizedImageUrl, 
 ImageLoadingStrategies
} from '../utils/imageOptimization';

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
 format,
 loading,
 fetchPriority,
 className = '',
 strategy = 'CONTENT',
 responsive = false,
 sizes,
 placeholder = 'blur',
 onLoad,
 onError
}: OptimizedImageProps) {
 const imgRef = useRef<HTMLImageElement>(null);
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
 const finalFormat = format || strategyConfig.format;
 const finalWidth = width || ('width' in strategyConfig ? strategyConfig.width : undefined);

 // Get optimized image URL
 const optimizedSrc = getOptimizedImageUrl(effectiveSrc, {
 width: finalWidth,
 height,
 quality: finalQuality,
 format: finalFormat
 });

 // Get responsive srcSet if enabled (currently unused - Next.js handles responsive images via sizes prop)
 // const srcSet = responsive ? getResponsiveImageSrcSet(src, undefined, {
 // height,
 // quality: finalQuality,
 // format: finalFormat
 // }) : undefined;

 // For Next.js Image, we need to handle responsive images differently
 // We'll use the sizes prop and let Next.js handle the responsive behavior
 const finalSizes = responsive && sizes ? sizes : undefined;

 useEffect(() => {
 if (finalLoading === 'lazy' && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting && imgRef.current) {
 const img = imgRef.current;
 if (img.dataset.src) {
 img.src = img.dataset.src;
 delete img.dataset.src;
 }
 observer.unobserve(img);
 }
 });
 },
 {
 rootMargin: '50px 0px',
 threshold: 0.01
 }
 );

 if (imgRef.current) {
 observer.observe(imgRef.current);
 }

 return () => observer.disconnect();
 }
 }, [finalLoading]);

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
 width={finalWidth || 0}
 height={height || 0}
 unoptimized
 />
 );
 }

 return (
 <Image
 ref={imgRef}
   src={optimizedSrc}
 sizes={finalSizes}
 alt={alt}
 width={finalWidth || 0}
 height={height || 0}
   quality={finalQuality}
 loading={finalLoading}
 fetchPriority={finalFetchPriority}
 unoptimized={isExternal}
 className={`${className} ${isLoaded ? 'loaded' : ''} ${placeholder === 'blur' && !isLoaded ? 'blur-sm' : ''}`}
 style={{
 transition: 'filter 0.3s ease-in-out',
 filter: placeholder === 'blur' && !isLoaded ? 'blur(5px)' : 'none'
 }}
 onLoad={handleLoad}
 onError={handleError}
 />
 );
}
