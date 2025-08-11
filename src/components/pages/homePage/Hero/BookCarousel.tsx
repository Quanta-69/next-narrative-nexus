"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DynamicCard from "./BookCard";
import Autoplay from "embla-carousel-autoplay";
import "./CarouselStyles.css";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  rating?: number;
  pricePerChapter?: number;
  readUrl?: string;
  tags?: string[];
}

interface ResponsiveBookCarouselProps {
  books: Book[];
  title: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  className?: string;
}

export default function ResponsiveBookCarousel({
  books,
  autoSlide = true,
  autoSlideInterval = 3000,
  className = "",
}: ResponsiveBookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: autoSlideInterval, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`w-full ${className}`}>
      <div className="carousel-container">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {books.map((book) => (
              <div key={book.id} className="embla__slide px-2">
                <DynamicCard
                  title={book.title}
                  author={book.author}
                  coverImageUrl={book.coverImageUrl}
                  rating={book.rating}
                  pricePerChapter={book.pricePerChapter}
                  readUrl={book.readUrl}
                  tags={book.tags}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--color-primary)] p-2 rounded-full z-10 shadow-md transition-all ${
            prevBtnEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--color-primary)] p-2 rounded-full z-10 shadow-md transition-all ${
            nextBtnEnabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
