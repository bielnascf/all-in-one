"use client";

import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const topElement = document.createElement('div');
    topElement.style.position = 'absolute';
    topElement.style.top = '0';
    topElement.style.height = '1px';
    topElement.style.width = '100%';
    document.body.prepend(topElement);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: [1],
      }
    );

    observer.observe(topElement);

    return () => {
      observer.disconnect();
      topElement.remove();
    };
  }, []);

  return isScrolled;
} 