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
}

const LazyImage: React.FC<LazyImageProps> = ({
 src,
 alt,
 className = '',
 onError,
 placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuCkmuCkv+CkpOCljeCksOCkl+CkouCkvyDgpJXgpYAg4KSa4KS+4KSs4KWAPC90ZXh0Pjwvc3ZnPg==',
 threshold = 0.1,
 fill = false
}) => {
 const isLocal = src.startsWith('/');
 const [imageSrc, setImageSrc] = useState(isLocal ? src : placeholder);
 const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
 const observerRef = useRef<IntersectionObserver | null>(null);

 useEffect(() => {
 if (isLocal) return;
 if (imageRef && imageSrc === placeholder) {
 observerRef.current = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setImageSrc(src);
 if (observerRef.current) {
 observerRef.current.disconnect();
 }
 }
 });
 },
 { threshold }
 );

 observerRef.current.observe(imageRef);
 }

 return () => {
 if (observerRef.current) {
 observerRef.current.disconnect();
 }
 };
 }, [imageRef, imageSrc, placeholder, src, threshold, isLocal]);

 const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
 if (onError) {
 onError(e);
 } else {
 e.currentTarget.src = placeholder;
 }
 };

 const imageProps = {
 src: imageSrc,
 alt: alt,
 className: `${className} transition-opacity duration-300 ${
 imageSrc === placeholder ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'
 }`,
 onError: handleError,
 loading: "lazy" as const,
 unoptimized: src.includes('wikimedia.org')
 };

 if (fill) {
 return (
 // eslint-disable-next-line jsx-a11y/alt-text
 <Image
 ref={setImageRef}
 {...imageProps}
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
 );
 }

 return (
 // eslint-disable-next-line jsx-a11y/alt-text
 <Image
 ref={setImageRef}
 {...imageProps}
 width={0}
 height={0}
 sizes="100vw"
 style={{ width: '100%', height: 'auto' }}
 />
 );
};

export default LazyImage;
