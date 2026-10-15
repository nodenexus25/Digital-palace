"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "./LanguageProvider";
import { localizeHref } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * A Link that keeps the reader in their current language: `/forts` becomes
 * `/hi/forts` on Hindi pages. External, mailto and hash links pass through.
 */
export default function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const { currentLanguage } = useLanguage();
  return <Link href={localizeHref(href, currentLanguage)} {...rest} />;
}
