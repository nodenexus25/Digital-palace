# Architecture & Design

## Overview
This document outlines the architecture for the Rajputana history platform, which uses **Sanity.io** as its Content Management System (CMS) and **Next.js** for the frontend.

## 1. Content Management (Sanity)
We use Sanity for managing all historical content, including blogs, stories, and other related entities.

### Key Content Types
*   **Post**: Main blog/article content with rich text (Portable Text), images, and categories.
*   **Author**: Information about content creators.
*   **Category**: Organizing content into different historical or cultural themes.

## 2. Frontend (Next.js)
The frontend is built with Next.js, leveraging Server Components for performance and SEO.

### Key Features
*   **Sanity Integration**: Uses `next-sanity` for fetching content with real-time preview support.
*   **Multi-Language Support**: Custom language provider for switching between English and Hindi.
*   **Responsive Design**: Built with Tailwind CSS for a modern, mobile-first experience.

## 3. Media Handling
*   **Sanity Asset Pipeline**: All images are stored and served via Sanity's asset pipeline, supporting on-the-fly transformations (resizing, cropping, etc.).
*   **Optimized Images**: Uses `next/image` with Sanity URLs for optimal performance.

## 4. Search & SEO
*   **Metadata**: Dynamic metadata generation based on content and language.
*   **Sitemap**: Automatically generated sitemap for search engine indexing.
