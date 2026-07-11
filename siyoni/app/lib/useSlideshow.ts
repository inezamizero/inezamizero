import { useEffect, useState } from "react";

// Shared slide-index state + keyboard arrow navigation for the dark
// slideshow prayer pages. Direction is tracked so the slide transition can
// animate in from the correct side.
export function useSlideshow(total: number) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    if (next < 0 || next >= total) return;
    setDirection(next > slideIndex ? 1 : -1);
    setSlideIndex(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(slideIndex + 1);
      if (e.key === "ArrowLeft") goTo(slideIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, total]);

  return {
    slideIndex,
    direction,
    goTo,
    next: () => goTo(slideIndex + 1),
    prev: () => goTo(slideIndex - 1),
  };
}
