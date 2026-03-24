/**
 * Image optimization utilities for Rajputana Palace
 */

export interface ImageOptimizationOptions {
 width?: number;
 height?: number;
 quality?: number;
 format?: 'webp' | 'jpeg' | 'png';
 blurDataURL?: boolean;
}

/**
 * Generate optimized image URL with parameters
 */
export function getOptimizedImageUrl(
 src: string, 
 options: ImageOptimizationOptions = {}
): string {
  void options;
 // If it's an external image, return as-is (we can't optimize external images)
 if (src.startsWith('http') || src.startsWith('//')) {
 return src;
 }

 // For local images, prefer clean path and let next/image handle optimization
 return src;
}

/**
 * Generate responsive image srcSet
 */
export function getResponsiveImageSrcSet(
 src: string,
 sizes: number[] = [640, 768, 1024, 1280, 1920],
 options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
 return sizes
 .map(size => `${getOptimizedImageUrl(src, { ...options, width: size })} ${size}w`)
 .join(', ');
}

/**
 * Generate blur data URL for placeholder
 */
export function getBlurDataURL(width: number = 700, height: number = 475): string {
 const w = Math.round(width / 10);
 const h = Math.round(height / 10);
 
 // Create a simple SVG placeholder
 const svg = `
 <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" style="stop-color:#8B4513;stop-opacity:0.1" />
 <stop offset="100%" style="stop-color:#CD853F;stop-opacity:0.1" />
 </linearGradient>
 </defs>
 <rect width="100%" height="100%" fill="url(#grad)" />
 <rect x="10%" y="40%" width="80%" height="20%" fill="#8B4513" opacity="0.3" rx="2" />
 </svg>
 `;
 
 return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
 return new Promise((resolve, reject) => {
 const img = new Image();
 img.onload = () => resolve();
 img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
 img.src = src;
 });
}

/**
 * Check if image format is supported
 */
export function isImageFormatSupported(format: string): boolean {
 const canvas = document.createElement('canvas');
 canvas.width = 1;
 canvas.height = 1;
 
 return canvas.toDataURL(`image/${format}`).indexOf(`image/${format}`) === 5;
}

/**
 * Get optimal image format for the browser
 */
export function getOptimalImageFormat(): 'webp' | 'jpeg' | 'png' {
 if (isImageFormatSupported('webp')) {
 return 'webp';
 }
 return 'jpeg';
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages(container: HTMLElement | Document = document): void {
 if (!('IntersectionObserver' in window)) {
 // Fallback for browsers without Intersection Observer
 const images = container.querySelectorAll('img[data-src]');
 images.forEach(img => {
 const imgElement = img as HTMLImageElement;
 if (imgElement.dataset.src) {
 imgElement.src = imgElement.dataset.src;
 delete imgElement.dataset.src;
 }
 });
 return;
 }

 const imageObserver = new IntersectionObserver(
 (entries, observer) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 const img = entry.target as HTMLImageElement;
 
 if (img.dataset.src) {
 img.src = img.dataset.src;
 delete img.dataset.src;
 img.classList.add('loaded');
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

 const images = container.querySelectorAll('img[data-src]');
 images.forEach(img => imageObserver.observe(img));
}

/**
 * Optimize image loading for different scenarios
 */
export const ImageLoadingStrategies = {
 /**
 * Hero images - load immediately with high priority
 */
 HERO: {
 loading: 'eager' as const,
 fetchPriority: 'high' as const,
 quality: 90,
 format: 'webp' as const
 },
 
 /**
 * Content images - lazy load with medium quality
 */
 CONTENT: {
 loading: 'lazy' as const,
 fetchPriority: 'low' as const,
 quality: 80,
 format: 'webp' as const
 },
 
 /**
 * Thumbnail images - smaller size, lower quality
 */
 THUMBNAIL: {
 loading: 'lazy' as const,
 fetchPriority: 'low' as const,
 quality: 60,
 format: 'webp' as const,
 width: 300
 }
};
