import React from "react";
import { isLocale } from "@/i18n/config";

/** Route without its locale prefix: `/hi/battles` -> `/battles`, `/en` -> `/`. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return "/" + segments.join("/");
}

/** App shell. Section surfaces are painted per block with .section--* classes. */
export default function ThemedContainer({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
