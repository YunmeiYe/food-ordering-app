"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export function initPreline(times = 0) {
  setTimeout(
    () => {
      try {
        window.HSStaticMethods.autoInit();
      } catch (error) {
        if (times <= 10) {
          initPreline(times + 1);
        } else {
          throw error;
        }
      }
    },
    100 * (times + 1),
  );
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    initPreline();
  }, [path]);

  return null;
}