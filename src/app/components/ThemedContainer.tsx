"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { isLocale } from "@/i18n/config";

/** Route without its locale prefix: `/hi/battles` -> `/battles`, `/en` -> `/`. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return "/" + segments.join("/");
}

const getRealmClass = (route: string): string => {
  if (route === "/") return "theme-light-heritage realm-home";
  if (route.startsWith("/battles")) return "theme-dark-valor realm-battles";
  if (route.startsWith("/weapons")) return "theme-dark-valor realm-weapons";
  if (route.startsWith("/stories") || route.startsWith("/legends")) return "theme-dark-valor realm-legends";
  if (route.startsWith("/dynasties")) return "theme-light-heritage realm-dynasties";
  if (route.startsWith("/forts")) return "theme-light-heritage realm-forts";
  if (route.startsWith("/festivals")) return "theme-light-heritage realm-festivals";
  if (route.startsWith("/folklore")) return "theme-light-heritage realm-folktales";
  if (route.startsWith("/blogs")) return "theme-light-heritage realm-blogs";
  return "theme-light-heritage";
};

export default function ThemedContainer({ children }: { children: React.ReactNode }) {
  const route = stripLocale(usePathname() || "/");
  return (
    <div className={`min-h-screen bg-background text-foreground fresco-texture ${getRealmClass(route)}`}>
      {children}
    </div>
  );
}
