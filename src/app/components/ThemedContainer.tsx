 "use client";
 
 import { usePathname } from "next/navigation";
  import React from "react";
  import Navbar from "./Navbar";
 
  const getRealmClass = (pathname: string): string => {
   if (!pathname || pathname === "/") return "theme-light-heritage realm-home";
   if (pathname.startsWith("/battles")) return "theme-dark-valor realm-battles";
   if (pathname.startsWith("/weapons")) return "theme-dark-valor realm-weapons";
   if (pathname.startsWith("/stories")) return "theme-dark-valor realm-legends";
   if (pathname.startsWith("/warriors")) return "theme-dark-valor realm-warriors";
 
   if (pathname.startsWith("/dynasties")) return "theme-light-heritage realm-dynasties";
   if (pathname.startsWith("/forts")) return "theme-light-heritage realm-forts";
   if (pathname.startsWith("/festivals")) return "theme-light-heritage realm-festivals";
   if (pathname.startsWith("/folklore")) return "theme-light-heritage realm-folktales";
   if (pathname.startsWith("/blogs")) return "theme-light-heritage realm-blogs";
   return "theme-light-heritage";
 };
 
 export default function ThemedContainer({ children }: { children: React.ReactNode }) {
   const pathname = usePathname() || "";
   const realmClass = getRealmClass(pathname);
   const isHomePage = pathname === "/" || pathname === "";
 
   return (
     <div className={`min-h-screen bg-background text-foreground fresco-texture ${realmClass}`}>
       {!isHomePage && <Navbar />}
       {children}
     </div>
   );
 }
