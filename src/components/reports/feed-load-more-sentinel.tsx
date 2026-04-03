"use client";

import { useEffect, useRef } from "react";

export interface FeedLoadMoreSentinelProps {
  disabled?: boolean;
  onVisible: () => void;
}

export function FeedLoadMoreSentinel({
  onVisible,
  disabled = false,
}: FeedLoadMoreSentinelProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled || !targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          onVisible();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [disabled, onVisible]);

  return <div ref={targetRef} className="h-1 w-full" aria-hidden="true" />;
}
